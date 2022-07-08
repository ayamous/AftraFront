import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  deleteLanguage,
  editLanguage,
  languagesListId
} from "../../../../../../services/repositories/basic-repositories/languages";
import CustomsAutoComplete from "../../../basic-repositories/side-menu/customs-regime/customsAutoComplete";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function ProceduresTable(props) {
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
      .invalidateQueries(languagesListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteLanguage(id),
    {
      onSuccess: () => onSuccess(t("Procédure suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editLanguage(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Procédure modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Code"),
      dataIndex: "code",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.code = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du pays"),
      dataIndex: "countryRefId",
      editable: true,
      render: (text, { id, countryRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryRefId}
            onSelect={(x) => {
              values.countryRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du régime"),
      dataIndex: "customsRegimRefId",
      editable: true,
      render: (text, { id, customsRegimRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CustomsAutoComplete
            defaultValue={customsRegimRefId}
            onSelect={(x) => {
              values.customsRegimRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Actions"),
      dataIndex: "",
      align: "right",
      fixed: "right",
      render: (text, { id }) => {
        const editRow = edit === id;
        return (
          <RowActions
            id={id}
            edit={() => setEdit(id)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(id)}
            inEdit={editRow}
            remove={() => remove(id)}
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

ProceduresTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      countryRefId: PropTypes.number,
      customsRegimRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

ProceduresTable.defaultProps = {
  data: null
};

export default ProceduresTable;
