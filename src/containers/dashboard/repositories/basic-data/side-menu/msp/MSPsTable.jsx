import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";
import DocumentsSetupAutoComplete from "../../../documents/side-menu/document-setup/documentSetepAutoComplete";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  MSPsListId,
  deleteMSP,
  editMSP
} from "../../../../../../services/repositories/basic-data/msp";

function MSPsTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(MSPsListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteMSP(id),
    {
      onSuccess: () => onSuccess(t("MSP suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editMSP(id, values),
    {
      onSuccess: () => {
        onSuccess(t("MSP modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Code de MSP"),
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
      title: t("Réferance document"),
      dataIndex: "documentSetupRef",
      editable: true,
      render: (text, { id, documentSetupRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DocumentsSetupAutoComplete
            defaultValue={documentSetupRefId}
            onSelect={(x) => {
              values.documentId = x;
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
            onSelect={(x) => {
              values.countryId = x;
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

MSPsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      documentSetupRef: PropTypes.string,
      documentSetupRefId: PropTypes.number,
      countryRef: PropTypes.string,
      countryRefId: PropTypes.number,
      code: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

MSPsTable.defaultProps = {
  data: null
};

export default MSPsTable;
