import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import { operationFailed, refetchFailure, success } from "../../../../../../utils/notify-user";
import {
  deleteMSPCustomsRelation,
  MSPCustomsRelationsListId
} from "../../../../../../services/repositories/basic-data/msp-customs-relations";

const genID = (x, y) => `${x}-${y}`;

function MSPRegimesTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(MSPCustomsRelationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteMSPCustomsRelation(obj),
    {
      onSuccess: () => onSuccess(t("Relation pays-groupement suprimée")),
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence de msp"),
      dataIndex: "mspReference"
    },
    {
      title: t("Référence de Régime"),
      dataIndex: "customsRegimReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { msptId, customsRegimId }) => (
        <RowActions
          id={genID(msptId, customsRegimId)}
          remove={() => remove({ msptId, customsRegimId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ msptId, customsRegimId }) => genID(msptId, customsRegimId)}
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

MSPRegimesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      mspReference: PropTypes.string,
      customsRegimReference: PropTypes.string,
      msptId: PropTypes.number,
      customsRegimId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

MSPRegimesTable.defaultProps = {
  data: null
};

export default MSPRegimesTable;
