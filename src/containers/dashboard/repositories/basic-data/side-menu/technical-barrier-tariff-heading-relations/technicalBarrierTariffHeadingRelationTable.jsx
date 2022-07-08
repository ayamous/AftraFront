import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import { operationFailed, refetchFailure, success } from "../../../../../../utils/notify-user";
import {
  deleteTCTariffsRelation,
  TCTariffsRelationsListId
} from "../../../../../../services/repositories/basic-data/technical-barrier-tariff-relations";

const genID = (x, y) => `${x}-${y}`;

function TechnicalBarrierTariffHeadingRelationTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(TCTariffsRelationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteTCTariffsRelation(obj),
    {
      onSuccess: () => onSuccess(t("Relation pays-groupement suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Code du barrière technique"),
      dataIndex: "techBarrierRefCode"
    },
    {
      title: t("Référence du position tarifaire"),
      dataIndex: "tariffBookReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { techBarrierRefId, tariffBookId }) => (
        <RowActions
          id={genID(techBarrierRefId, tariffBookId)}
          remove={() => remove({ techBarrierRefId, tariffBookId })}
          loading={removing}
        />
      )
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

TechnicalBarrierTariffHeadingRelationTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      techBarrierRefId: PropTypes.number,
      techBarrierRefCode: PropTypes.string,
      tariffBookReference: PropTypes.string,
      tariffBookId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

TechnicalBarrierTariffHeadingRelationTable.defaultProps = {
  data: null
};

export default TechnicalBarrierTariffHeadingRelationTable;
