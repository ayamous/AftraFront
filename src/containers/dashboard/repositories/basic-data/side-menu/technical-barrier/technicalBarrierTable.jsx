import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import { operationFailed, refetchFailure, success } from "../../../../../../utils/notify-user";
import {
  deleteTechnicalBarrier,
  editTechnicalBarrier,
  technicalBarriersListId
} from "../../../../../../services/repositories/basic-data/technical-barrier";
import DocumentsSetupAutoComplete
  from "../../../documents/side-menu/document-setup/documentSetepAutoComplete";
import CountriesAutoComplete
  from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function TechnicalBarrierTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(technicalBarriersListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteTechnicalBarrier(id),
    {
      onSuccess: () => onSuccess(t("Barrière technique suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editTechnicalBarrier(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Barrière technique modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Code du barrière technique"),
      dataIndex: "techBarrierRefCode",
      editable: true,
      render: (text, { techBarrierRefId }) => {
        const editRow = edit === techBarrierRefId;
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
      title: t("Référence du document"),
      dataIndex: "documentReference",
      editable: true,
      render: (text, { techBarrierRefId, documentId }) => {
        const editRow = edit === techBarrierRefId;
        if (!editRow) return text;
        return (
          <DocumentsSetupAutoComplete
            defaultValue={documentId}
            onSelect={(x) => {
              values.documentId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du pays"),
      dataIndex: "countryReference",
      editable: true,
      render: (text, { techBarrierRefId, countryId }) => {
        const editRow = edit === techBarrierRefId;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryId}
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
      render: (text, { techBarrierRefId }) => {
        const editRow = edit === techBarrierRefId;
        return (
          <RowActions
            id={techBarrierRefId}
            edit={() => setEdit(techBarrierRefId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(techBarrierRefId)}
            inEdit={editRow}
            remove={() => remove(techBarrierRefId)}
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
        rowKey={({ techBarrierRefId }) => techBarrierRefId}
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

TechnicalBarrierTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      techBarrierRefId: PropTypes.number,
      techBarrierRefCode: PropTypes.string,
      countryReference: PropTypes.string,
      documentReference: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

TechnicalBarrierTable.defaultProps = {
  data: null
};

export default TechnicalBarrierTable;
