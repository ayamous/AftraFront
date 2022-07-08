import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table, Switch } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  deleteUserProfile,
  editUserProfile,
  usersProfilesListId
} from "../../../../../../services/repositories/data-actors/user-profiles";

function UsersProfilesTable(props) {
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
      .invalidateQueries(usersProfilesListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteUserProfile(id),
    {
      onSuccess: () => onSuccess(t("Profil utilisteur suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editUserProfile(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Profil utilisteur modifiée"));
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
      title: t("Nom"),
      dataIndex: "name",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.name = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Rang"),
      dataIndex: "rank",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            type="number"
            defaultValue={text}
            onChange={(e) => {
              values.rank = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Activé"),
      dataIndex: "enabled",
      editable: true,
      render: (text, { id, enabled }) => {
        const editRow = edit === id;
        if (!editRow) {
          if (enabled) return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
          return <CloseCircleOutlined style={{ color: "#fa8c16" }} />;
        }
        return (
          <Switch
            defaultChecked={enabled}
            onChange={(x) => {
              values.enabled = x;
            }}
          />
        );
      }
    },
    {
      title: t("Description"),
      dataIndex: "description",
      ellipsis: true,
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.description = e.target.value;
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

UsersProfilesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      reference: PropTypes.string,
      name: PropTypes.string,
      rank: PropTypes.number,
      enabled: PropTypes.bool,
      description: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

UsersProfilesTable.defaultProps = {
  data: null
};

export default UsersProfilesTable;
