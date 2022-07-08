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
  deletePort,
  editPort,
  portsListId
} from "../../../../../../services/repositories/basic-data/ports";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function PortsTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(portsListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deletePort(id),
    {
      onSuccess: () => onSuccess(t("Port suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editPort(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Port modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Code du port"),
      dataIndex: "portRefCode",
      editable: true,
      render: (text, { portRefId }) => {
        const editRow = edit === portRefId;
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
      render: (text, { portRefId, countryId }) => {
        const editRow = edit === portRefId;
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
      render: (text, { portRefId }) => {
        const editRow = edit === portRefId;
        return (
          <RowActions
            id={portRefId}
            edit={() => setEdit(portRefId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(portRefId)}
            inEdit={editRow}
            remove={() => remove(portRefId)}
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
        rowKey={({ portRefId }) => portRefId}
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

PortsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      countryRef: PropTypes.string,
      countryId: PropTypes.number,
      portRefCode: PropTypes.string,
      portRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

PortsTable.defaultProps = {
  data: null
};

export default PortsTable;
