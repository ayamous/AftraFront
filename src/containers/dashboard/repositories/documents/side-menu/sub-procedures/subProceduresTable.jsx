/* eslint-disable max-len */
import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  deleteDocumentSubProcedure,
  documentSubProceduresListId
} from "../../../../../../services/repositories/documents/sub-procedures";

const genID = (x, y) => `${x}-${y}`;

function SubProceduresTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(documentSubProceduresListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteDocumentSubProcedure(obj),
    {
      onSuccess: () => onSuccess(t("Relation document - pays origine suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence du document"),
      dataIndex: "document",
      sorter: {}
    },
    {
      title: t("Référence du sous-procédure"),
      dataIndex: "subProcedure",
      sorter: {}
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { documentSetupRefId, nationalProcedureRefId }) => (
        <RowActions
          id={genID(documentSetupRefId, nationalProcedureRefId)}
          remove={() => remove({ documentSetupRefId, nationalProcedureRefId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ documentSetupRefId, nationalProcedureRefId }) => genID(documentSetupRefId, nationalProcedureRefId)}
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

SubProceduresTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      default: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

SubProceduresTable.defaultProps = {
  data: null
};

export default SubProceduresTable;
