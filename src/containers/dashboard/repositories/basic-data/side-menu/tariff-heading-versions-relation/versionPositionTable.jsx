import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  chaptersListId,
  deleteChapter,
  editChapter
} from "../../../../../../services/repositories/basic-data/chapters";
import TariffVersionsAutoComplete from "../tariff-heading-versions/tariffVersionsAutoComplete";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function VersionPositionTable(props) {
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
      .invalidateQueries(chaptersListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteChapter(id),
    {
      onSuccess: () => onSuccess(t("Chapitre suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editChapter(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Chapitre modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence du tarif book"),
      dataIndex: "tariffBookRef"
    },
    {
      title: t("Référence de la version"),
      dataIndex: "versionRef",
      editable: true,
      render: (text, { id, versionRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <TariffVersionsAutoComplete
            defaultValue={versionRefId}
            onChange={(x) => {
              values.versionRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du pays"),
      dataIndex: "countryRef",
      editable: true,
      render: (text, { id, countryRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryRefId}
            onChange={(x) => {
              values.countryRefId = x;
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

VersionPositionTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tariffBookRef: PropTypes.string,
      versionRef: PropTypes.string,
      countryRef: PropTypes.string,
      versionRefId: PropTypes.number,
      countryRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

VersionPositionTable.defaultProps = {
  data: null
};

export default VersionPositionTable;
