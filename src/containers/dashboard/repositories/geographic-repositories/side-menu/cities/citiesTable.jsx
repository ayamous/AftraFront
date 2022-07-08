import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  refetchFailure,
  operationFailed,
  success
} from "../../../../../../utils";
import {
  citiesListId,
  deleteCity,
  editCity
} from "../../../../../../services/repositories/geographic-repositories/cities";
import CountriesAutoComplete from "../countries/countriesAutoComplete";

function CitiesTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(citiesListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteCity(id),
    {
      onSuccess: () => onSuccess(t("Ville suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editCity(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Ville modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence et identifiant ville"),
      dataIndex: "reference",
      editable: true,
      render: (text, { cityRefId }) => {
        const editRow = edit === cityRefId;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.reference = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du pays de la ville"),
      dataIndex: "countryRef",
      editable: true,
      render: (text, { cityRefId }) => {
        const editRow = edit === cityRefId;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={text}
            onSelect={(x) => {
              values.countryRefId = x;
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
      render: (text, { cityRefId }) => {
        const editRow = edit === cityRefId;
        return (
          <RowActions
            id={cityRefId}
            edit={() => setEdit(cityRefId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(cityRefId)}
            inEdit={editRow}
            remove={() => remove(cityRefId)}
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
        rowKey={({ cityRefId }) => cityRefId}
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

CitiesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      cityRefId: PropTypes.number,
      reference: PropTypes.string,
      countryRef: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

CitiesTable.defaultProps = {
  data: null
};

export default CitiesTable;
