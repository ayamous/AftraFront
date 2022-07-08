import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Input, Table, DatePicker, Tag
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import {
  formatDate,
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  deleteUser,
  editUser,
  usersListId
} from "../../../../../../services/repositories/data-actors/users";
import UsersProfilesAutoComplete from "../user-profiles/usersProfilesAutoComplete";
import StatusTypes from "./statusTypes";

function UsersTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(usersListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteUser(id),
    {
      onSuccess: () => onSuccess(t("Utilisateur suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editUser(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Utilisateur modifié"));
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
      title: t("Login"),
      dataIndex: "login",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.login = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Mot de passe"),
      dataIndex: "password",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.password = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Mot de passe temporaire"),
      dataIndex: "temporalPwd",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.temporalPwd = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Date d’expiration"),
      dataIndex: "temporalPwdExpDate",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return formatDate(text);
        return (
          <DatePicker
            defaultValue={moment(text, "DD-MM-YYYY")}
            onChange={(date) => {
              values.temporalPwdExpDate = formatDate(date);
            }}
          />
        );
      }
    },
    {
      title: t("Statut"),
      dataIndex: "status",
      editable: true,
      render: (text, { id, status }) => {
        const editRow = edit === id;
        if (!editRow) {
          if (text === "ENABLED") return <Tag color="success">{text}</Tag>;
          if (text === "SUSPENDED") return <Tag color="warning">{text}</Tag>;
          return <Tag color="error">{text}</Tag>;
        }
        return (
          <StatusTypes
            defaultChecked={status}
            onSelect={(x) => {
              values.status = x;
            }}
          />
        );
      }
    },
    {
      title: t("Profil utilisateur"),
      dataIndex: "profilReference",
      editable: true,
      render: (text, { id, profilId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <UsersProfilesAutoComplete
            defaultValue={profilId}
            onChange={(e) => {
              values.login = e.target.value;
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

UsersTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      reference: PropTypes.string,
      login: PropTypes.string,
      password: PropTypes.string,
      temporalPwdExpDate: PropTypes.string,
      status: PropTypes.string,
      profilReference: PropTypes.string,
      profilId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

UsersTable.defaultProps = {
  data: null
};

export default UsersTable;
