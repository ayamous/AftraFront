import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  deleteLanguage,
  editLanguage,
  languagesListId
} from "../../../../../../services/repositories/basic-repositories/languages";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";

function LanguagesTable(props) {
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
      .invalidateQueries(languagesListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteLanguage(id),
    {
      onSuccess: () => onSuccess(t("Langue suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editLanguage(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Langue modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Code de la langue"),
      dataIndex: "code",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            required
            defaultValue={text}
            onChange={(e) => {
              values.code = e.target.value;
            }}
            rules={[{ required: true, message: t("Champ requis") }]}
          />
        );
      }
    },
    {
      title: t("Libellé de la langue"),
      dataIndex: "name",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            hasFeedback
            defaultValue={text}
            onChange={(e) => {
              values.name = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Langue par défaut"),
      dataIndex: "def",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.def = e.target.value;
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

LanguagesTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      name: PropTypes.string,
      default: PropTypes.string
    })
  ),
  total: PropTypes.number,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

LanguagesTable.defaultProps = {
  data: null,
  total: 0
};

export default LanguagesTable;
