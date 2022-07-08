import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  taxingListId,
  deleteTaxing,
  editTaxing
} from "../../../../../../services/repositories/basic-data/taxing";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";
import CustomsAutoComplete from "../../../basic-repositories/side-menu/customs-regime/customsAutoComplete";
import MeasureUnitsAutoComplete from "../../../basic-repositories/side-menu/measure-units/measureUnitsAutoComplete";
import TaxTypesAutoComplete from "../tax-types/taxTypesAutoComplete";

function TaxingTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(taxingListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteTaxing(id),
    {
      onSuccess: () => onSuccess(t("Chapitre suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editTaxing(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Chapitre modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence"),
      dataIndex: "reference",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
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
      title: t("Taux imposition"),
      dataIndex: "rate",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.rate = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Valeur imposition"),
      dataIndex: "value",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.value = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Référence pays"),
      dataIndex: "countryReference",
      editable: true,
      render: (text, { id, countryRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryRefId}
            onSelect={(x) => {
              values.countryRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Réferance régime"),
      dataIndex: "customsRegimCode",
      editable: true,
      render: (text, { id, customRegimeRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CustomsAutoComplete
            defaultValue={customRegimeRefId}
            onSelect={(x) => {
              values.customRegimeRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence unité"),
      dataIndex: "unitRefCode",
      editable: true,
      render: (text, { id, unitRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <MeasureUnitsAutoComplete
            defaultValue={unitRefId}
            onSelect={(x) => {
              values.unitRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence type de taxe"),
      dataIndex: "taxRefCode",
      editable: true,
      render: (text, { id, taxRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <TaxTypesAutoComplete
            defaultValue={taxRefId}
            onSelect={(x) => {
              values.taxRefId = x;
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
      render: (text, { id }) => {
        const editRow = edit === id;
        return (
          <RowActions
            id={id}
            edit={() => setEdit(id)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(id)}
            inEdit={editRow}
            remove={() => remove(id)}
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
        rowKey={({ id }) => id}
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

TaxingTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      reference: PropTypes.string,
      rate: PropTypes.string,
      value: PropTypes.string,
      countryReference: PropTypes.string,
      countryRefId: PropTypes.number,
      customsRegimCode: PropTypes.string,
      customRegimeRefId: PropTypes.number,
      unitRefCode: PropTypes.string,
      unitRefId: PropTypes.number,
      taxRefCode: PropTypes.string,
      taxRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

TaxingTable.defaultProps = {
  data: null
};

export default TaxingTable;
