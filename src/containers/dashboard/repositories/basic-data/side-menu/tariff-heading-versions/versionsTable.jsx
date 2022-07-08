import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  DatePicker, Input, Switch, Table, Tag
} from "antd";
import { useMutation, useQueryClient } from "react-query";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
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
  tariffVersionsListId,
  deleteTariffVersions,
  editTariffVersions
} from "../../../../../../services/repositories/basic-data/tariff-versions";
import StatusSelector from "./statusSelector";

function VersionsTable(props) {
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
      .invalidateQueries(tariffVersionsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteTariffVersions(id),
    {
      onSuccess: () => onSuccess(t("Version suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editTariffVersions(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Version modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const statusTags = {
    VALIDATED: {
      color: "processing",
      text: t("validé")
    },
    APPLICATED: {
      color: "success",
      text: t("appliqué")
    },
    ARCHIVED: {
      color: "default",
      text: t("archivé")
    }
  };

  const columns = [
    {
      title: t("N°"),
      dataIndex: "version",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.version = e.target.value;
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
      title: t("Statut"),
      dataIndex: "status",
      editable: true,
      render: (val, { id }) => {
        const editRow = edit === id;
        if (!editRow) {
          try {
            return (
              <Tag color={statusTags[val].color}>{statusTags[val].text}</Tag>
            );
          } catch (e) {
            return val;
          }
        }
        return (
          <StatusSelector
            defaultValue={val}
            onChange={(x) => {
              values.status = x;
            }}
          />
        );
      }
    },
    {
      title: t("Date d’applicabilité"),
      dataIndex: "applicatedOn",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DatePicker
            defaultValue={moment(text, "DD-MM-YYYY")}
            onChange={(date) => {
              values.applicatedOn = formatDate(date);
            }}
          />
        );
      }
    },
    {
      title: t("Date de validation"),
      dataIndex: "validatedOn",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DatePicker
            defaultValue={moment(text, "DD-MM-YYYY")}
            onChange={(date) => {
              values.validatedOn = formatDate(date);
            }}
          />
        );
      }
    },
    {
      title: t("Date d’archivage"),
      dataIndex: "archivedOn",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DatePicker
            defaultValue={moment(text, "DD-MM-YYYY")}
            onChange={(date) => {
              values.archivedOn = formatDate(date);
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

VersionsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      version_nbr: PropTypes.number,
      version: PropTypes.bool,
      enabled: PropTypes.string,
      status: PropTypes.string,
      applicatedOn: PropTypes.string,
      validatedOn: PropTypes.string,
      archivedOn: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

VersionsTable.defaultProps = {
  data: null
};

export default VersionsTable;
