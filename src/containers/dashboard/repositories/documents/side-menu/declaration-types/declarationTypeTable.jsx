/* eslint-disable max-len */
import React from "react";
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
  declarationTypesListId,
  deleteDeclarationType
} from "../../../../../../services/repositories/documents/declaration-types";

const genID = (x, y) => `${x}-${y}`;

function DeclarationTypeTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(declarationTypesListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteDeclarationType(obj),
    {
      onSuccess: () => onSuccess(t("Relation document - pays origine suprimée")),
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence du document"),
      dataIndex: "documentSetupReference"
    },
    {
      title: t("Référence du type de déclaration"),
      dataIndex: "declarationTypeReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { documentSetupRefId, declarationTypeRefId }) => (
        <RowActions
          id={genID(documentSetupRefId, declarationTypeRefId)}
          remove={() => remove({ documentSetupRefId, declarationTypeRefId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ documentSetupRefId, declarationTypeRefId }) => genID(documentSetupRefId, declarationTypeRefId)}
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

DeclarationTypeTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      documentSetupReference: PropTypes.string,
      declarationTypeReference: PropTypes.string,
      documentSetupRefId: PropTypes.number,
      declarationTypeRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

DeclarationTypeTable.defaultProps = {
  data: null
};

export default DeclarationTypeTable;
