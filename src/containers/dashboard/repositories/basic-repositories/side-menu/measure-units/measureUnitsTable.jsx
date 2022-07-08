import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  refetchFailure,
  operationFailed,
  success
} from "../../../../../../utils";
import {
  deleteMeasureUnit,
  editMeasureUnit,
  measureUnitsListId
} from "../../../../../../services/repositories/basic-repositories/measure-units";

function MeasureUnitsTable(props) {
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
      .invalidateQueries(measureUnitsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteMeasureUnit(id),
    {
      onSuccess: () => onSuccess(t("Unité de mesure suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editMeasureUnit(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Unité de mesure modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Code unité de mesure"),
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
            edit={() => {
              setEdit(id);
            }}
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

MeasureUnitsTable.propTypes = {
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

MeasureUnitsTable.defaultProps = {
  data: null
};

export default MeasureUnitsTable;
