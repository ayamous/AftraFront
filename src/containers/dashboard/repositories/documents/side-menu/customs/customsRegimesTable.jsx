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
} from "../../../../../../utils";
import {
  deleteDocumentCustom,
  documentCustomListId
} from "../../../../../../services/repositories/documents/customs";

const genID = (x, y) => `${x}-${y}`;

function CustomsRegimesTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(documentCustomListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteDocumentCustom(obj),
    {
      onSuccess: () => onSuccess(t("Relation document - pays origine suprimée")),
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence du document setup"),
      dataIndex: "documentSetupReference"
    },
    {
      title: t("Référence du régime douanier"),
      dataIndex: "customsRegimCode"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { documentSetupId, customsRegimId }) => (
        <RowActions
          id={genID(documentSetupId, customsRegimId)}
          remove={() => remove({ documentSetupId, customsRegimId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ documentSetupId, customsRegimId }) => genID(documentSetupId, customsRegimId)}
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

CustomsRegimesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      documentSetupReference: PropTypes.string,
      customsRegimCode: PropTypes.string,
      documentSetupId: PropTypes.number,
      customsRegimId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

CustomsRegimesTable.defaultProps = {
  data: null
};

export default CustomsRegimesTable;
