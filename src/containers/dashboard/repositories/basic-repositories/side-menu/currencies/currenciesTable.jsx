import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import { operationFailed, success } from "../../../../../../utils";
import {
  deleteCurrency,
  editCurrency,
  currenciesListId
} from "../../../../../../services/repositories/basic-repositories/currencies";
import refetchFailure from "../../../../../../utils/notify-user/refetchFailure";

function CurrenciesTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(currenciesListId).catch(refetchFailure);
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteCurrency(id),
    {
      onSuccess: () => onSuccess(t("Devise suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editCurrency(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Devise modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Code de la devise"),
      dataIndex: "code",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
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

CurrenciesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

CurrenciesTable.defaultProps = {
  data: null
};

export default CurrenciesTable;
