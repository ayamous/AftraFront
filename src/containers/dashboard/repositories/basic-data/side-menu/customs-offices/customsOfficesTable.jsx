import React, { useState } from "react";
import { Input, Table } from "antd";
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
  officesListId,
  deleteOffice,
  editOffice
} from "../../../../../../services/repositories/basic-data/offices";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function CustomsOfficesTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(officesListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteOffice(id),
    {
      onSuccess: () => onSuccess(t("Bureau douane suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editOffice(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Bureau douane modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Code du bureau"),
      dataIndex: "customsOfficeCode",
      editable: true,
      render: (text, { customsOfficeId }) => {
        const editRow = edit === customsOfficeId;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.code = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du pays"),
      dataIndex: "countryRef",
      editable: true,
      render: (text, { customsOfficeId, countryId }) => {
        const editRow = edit === customsOfficeId;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryId}
            onSelect={(x) => {
              values.countryId = x;
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
      render: (text, { customsOfficeId }) => {
        const editRow = edit === customsOfficeId;
        return (
          <RowActions
            id={customsOfficeId}
            edit={() => setEdit(customsOfficeId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(customsOfficeId)}
            inEdit={editRow}
            remove={() => remove(customsOfficeId)}
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
        rowKey={({ customsOfficeId }) => customsOfficeId}
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

CustomsOfficesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      countryRef: PropTypes.string,
      countryId: PropTypes.number,
      customsOfficeCode: PropTypes.string,
      customsOfficeId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

CustomsOfficesTable.defaultProps = {
  data: null
};
export default CustomsOfficesTable;
