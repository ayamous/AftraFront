import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import { operationFailed, refetchFailure, success } from "../../../../../../utils/notify-user";
import {
  deleteSubProcedures, editSubProcedure,
  subProceduresListId
} from "../../../../../../services/repositories/basic-data/sub-procedures";
import CountriesAutoComplete
  from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function SubProceduresTable(props) {
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
      .invalidateQueries(subProceduresListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteSubProcedures(id),
    {
      onSuccess: () => onSuccess(t("Sous procédure suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editSubProcedure(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Sous procédure modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Code"),
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
      title: t("Référence sous procédure"),
      dataIndex: "ref_nationalProcedure",
      editable: true,
      render: (text, { id, countryRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryRefId}
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
      align: "right",
      fixed: "right",
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
        rowKey={({ code }) => code}
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

SubProceduresTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      default: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

SubProceduresTable.defaultProps = {
  data: null
};

export default SubProceduresTable;
