/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  refetchFailure,
  operationFailed,
  success
} from "../../../../../../utils";
import {
  countryGroupRelationsListId,
  deleteCountryGroupRelation
} from "../../../../../../services/repositories/geographic-repositories/country-group-relations";

const genID = (x, y) => `${x}-${y}`;

function CountryGroupRelationTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(countryGroupRelationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteCountryGroupRelation(obj),
    {
      onSuccess: () => onSuccess(t("Relation pays-groupement suprimée")),
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence pays"),
      dataIndex: "countryReference"
    },
    {
      title: t("Référence groupement"),
      dataIndex: "countryGroupReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { countryGroupRefId, countryRefId }) => (
        <RowActions
          id={genID(countryGroupRefId, countryRefId)}
          remove={() => remove({ countryGroupRefId, countryRefId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ countryGroupRefId, countryRefId }) => genID(countryGroupRefId, countryRefId)}
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

CountryGroupRelationTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      countryGroupRefId: PropTypes.number,
      countryRefId: PropTypes.number,
      countryReference: PropTypes.string,
      countryGroupReference: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

CountryGroupRelationTable.defaultProps = {
  data: null
};

export default CountryGroupRelationTable;
