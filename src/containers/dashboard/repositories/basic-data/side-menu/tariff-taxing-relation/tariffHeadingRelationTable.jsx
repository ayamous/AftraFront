import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import { operationFailed, refetchFailure, success } from "../../../../../../utils/notify-user";
import {
  tariffTaxingRelationsListId,
  deleteTariffTaxingRelation
} from "../../../../../../services/repositories/basic-data/tariff-taxing-relations";

const genID = (x, y) => `${x}-${y}`;

function TariffHeadingRelationTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(tariffTaxingRelationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteTariffTaxingRelation(obj),
    {
      onSuccess: () => onSuccess(t("Relation position tarifaire - taxation suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence tarif book ref"),
      dataIndex: "tarifBookReference"
    },
    {
      title: t("Référence de taxation"),
      dataIndex: "taxationReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { tarifBookId, taxationId }) => (
        <RowActions
          id={genID(tarifBookId, taxationId)}
          remove={() => remove({ tarifBookId, taxationId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ tarifBookId, taxationId }) => genID(tarifBookId, taxationId)}
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

TariffHeadingRelationTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tarifBookId: PropTypes.number,
      taxationId: PropTypes.number,
      tarifBookReference: PropTypes.string,
      taxationReference: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

TariffHeadingRelationTable.defaultProps = {
  data: null
};

export default TariffHeadingRelationTable;
