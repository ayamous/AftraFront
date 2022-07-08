import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  deleteMSPtariffsRelation,
  MSPtariffsRelationsListId
} from "../../../../../../services/repositories/basic-data/msp-tariff-relations";

const genID = (x, y) => `${x}-${y}`;

function MSPTariffHeadingTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(MSPtariffsRelationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteMSPtariffsRelation(obj),
    {
      onSuccess: () => onSuccess(t("Relation pays-groupement suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence de MSP"),
      dataIndex: "mspReference",
      sorter: {}
    },
    {
      title: t("Référence de position tarifaire"),
      dataIndex: "tarifBookReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { msptId, tarifBookId }) => (
        <RowActions
          id={genID(msptId, tarifBookId)}
          remove={() => remove({ msptId, tarifBookId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ msptId, tarifBookId }) => genID(msptId, tarifBookId)}
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

MSPTariffHeadingTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      mspReference: PropTypes.string,
      tarifBookReference: PropTypes.string,
      mspId: PropTypes.number,
      tarifBookId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

MSPTariffHeadingTable.defaultProps = {
  data: null
};

export default MSPTariffHeadingTable;
