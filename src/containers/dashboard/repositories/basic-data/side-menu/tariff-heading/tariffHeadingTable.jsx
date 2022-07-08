import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table, DatePicker } from "antd";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  formatDate,
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import RowActions from "../../../../../../components/row-actions";
import {
  tariffHeadingsListId,
  deleteTariffHeading,
  editTariffHeading
} from "../../../../../../services/repositories/basic-data/tariff-headings";
import ChaptersAutoComplete from "../chapters/chaptersAutoComplete";
import MeasureUnitsAutoComplete from "../../../basic-repositories/side-menu/measure-units/measureUnitsAutoComplete";

function TariffHeadingTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(tariffHeadingsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteTariffHeading(id),
    {
      onSuccess: () => onSuccess(t("Position tarifaire suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editTariffHeading(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Position tarifaire modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence"),
      dataIndex: "reference",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.reference = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("HS code"),
      dataIndex: "hsCode",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.hsCode = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Référence Chapitre"),
      dataIndex: "chapterRef",
      editable: true,
      render: (text, { id, chapterRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <ChaptersAutoComplete
            defaultValue={chapterRefId}
            onChange={(x) => {
              values.chapterRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence de la position mère"),
      dataIndex: "parent",
      editable: true,
      render: (text, { id, chapterRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={chapterRefId}
            onChange={(e) => {
              values.chapterRef = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Référence unité"),
      dataIndex: "unitRef",
      editable: true,
      render: (text, { id, unitRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <MeasureUnitsAutoComplete
            defaultValue={unitRefId}
            onChange={(x) => {
              values.unitRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Année du production"),
      dataIndex: "productYear",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DatePicker
            picker="year"
            defaultValue={moment(text, "YYYY")}
            onChange={(x) => {
              values.productYear = x;
            }}
          />
        );
      }
    },
    {
      title: t("Date d’expiration"),
      dataIndex: "productExpiryDate",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DatePicker
            defaultValue={moment(text, "DD-MM-YYYY")}
            onChange={(date) => {
              values.productExpiryDate = formatDate(date);
            }}
          />
        );
      }
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { chapterRefId }) => {
        const editRow = edit === chapterRefId;
        return (
          <RowActions
            id={chapterRefId}
            edit={() => setEdit(chapterRefId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(chapterRefId)}
            inEdit={editRow}
            remove={() => remove(chapterRefId)}
            loading={editRow && (removing || updating)}
          />
        );
      }
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ id }) => id}
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          current,
          total,
          onChange: (page) => setPage(page - 1)
        }}
      />
      {error && <RefetchButton refetch={refetch} />}
    </>
  );
}

TariffHeadingTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      reference: PropTypes.string,
      hsCode: PropTypes.string,
      productYear: PropTypes.string,
      productExpiryDate: PropTypes.string,
      chapterRefId: PropTypes.number,
      unitRefId: PropTypes.number,
      parentId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

TariffHeadingTable.defaultProps = {
  data: null
};

export default TariffHeadingTable;
