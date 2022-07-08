import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import { operationFailed, refetchFailure, success } from "../../../../../../utils/notify-user";
import {
  chaptersListId,
  deleteChapter, editChapter
} from "../../../../../../services/repositories/basic-data/chapters";
import SectionsAutoComplete from "../sections/sectionsAutoComplete";

function ChaptersTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient.invalidateQueries(chaptersListId).catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteChapter(id),
    {
      onSuccess: () => onSuccess(t("Chapitre suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editChapter(id, values),
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
      title: t("Code du chapitre"),
      dataIndex: "chapterRefCode",
      editable: true,
      render: (text, { chapterRefId }) => {
        const editRow = edit === chapterRefId;
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
      title: t("Code section"),
      dataIndex: "sectionRefCode",
      editable: true,
      render: (text, { chapterRefId, sectionRefId }) => {
        const editRow = edit === chapterRefId;
        if (!editRow) return text;
        return (
          <SectionsAutoComplete
            defaultValue={sectionRefId}
            onSelect={(x) => {
              values.sectionId = x;
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
      render: (text, { chapterRefId }) => {
        const editRow = edit === chapterRefId;
        return (
          <RowActions
            id={chapterRefId}
            edit={() => setEdit(chapterRefId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(chapterRefId)}
            inEdit={editRow}
            remove={() => remove(chapterRefId)}
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
        rowKey={({ chapterRefId }) => chapterRefId}
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

ChaptersTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sectionRefCode: PropTypes.string,
      chapterRefCode: PropTypes.string,
      chapterRefId: PropTypes.number,
      sectionRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

ChaptersTable.defaultProps = {
  data: null
};

export default ChaptersTable;
