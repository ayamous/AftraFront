import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Input, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import "./styles.css";
import {
  FileFilled,
  FolderFilled,
  SearchOutlined,
  StarFilled,
  StarOutlined
} from "@ant-design/icons";
import RefetchButton from "../../../../components/reftech-button";
import RowActions from "../../../../components/row-actions";
import ColumnFilter from "../../../../components/column-filter";
// import ColumnFilterDates from "../../../../components/column-filter-date";
import {
  formatDate, operationFailed, refetchFailure, success
  // operationFailed, refetchFailure, success
} from "../../../../utils";
import {
  deleteDocuments, eSafeDocumentsListID, editDocuments, downloadDocuments
} from "../../../../services/e-safe";

function FoldersList(props) {
  const { push } = useHistory();
  const {
    error, data, loading, total, current, setPage, query, refetch, folderNavigate
  } = props;
  console.log("data", folderNavigate);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(eSafeDocumentsListID)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteDocuments(id),
    {
      onSuccess: () => onSuccess(t("dossier suprimée")),
      onError: () => operationFailed(t)
    }
  );

  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editDocuments(id, values),
    {
      onSuccess: () => {
        onSuccess(t("dossier modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  // console.log("edmStorld", downloadDocument(edmStorld));

  const columns = [
    {
      title: "",
      dataIndex: "docType",
      width: 50,
      render: (docType) => (docType !== "type1" ? (
        <Avatar
          icon={<FolderFilled style={{ color: "#6e6969" }} />}
          size="small"
        />
      ) : (
        <Avatar
          icon={<FileFilled style={{ color: "#6e6969" }} />}
          size="small"
        />
      ))
    },
    {
      title: t("Titre"),
      dataIndex: "fileName",
      filterIcon: <SearchOutlined />,
      filterDropdown: (
        <ColumnFilter search={(value) => query({ title: value })} />
      )
    },
    {
      title: t("Auteur"),
      dataIndex: "fileName",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.fileName = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Date de création"),
      dataIndex: "createdOn",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return formatDate(text);
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.createdOn = e.target.value;
            }}
          />
        );
      },
    },
    {
      title: t("Favorie"),
      dataIndex: "faved",
      render: (faved) => {
        if (faved) return <StarFilled style={{ color: "#faad14" }} />;
        return <StarOutlined style={{ color: "#faad14" }} />;
      }
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { id }) => {
        const editRow = edit === id;
        const edmStor = data.filter((ele) => ele.id === id)[0].edmStorld;
        return (
          <RowActions
            id={id}
            edit={() => setEdit(id)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(id)}
            inEdit={editRow}
            remove={() => remove(id)}
            loading={editRow && (removing || updating)}
            templateSrc="/resources/esafe_template.xlsx"
            download={() => downloadDocuments(edmStor)}
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
        onRow={({ docType, edmStorld }) => ({
          onDoubleClick: () => {
            const location = {
              pathname: "/dashboard/e-safe/navigation/sous-folder",
              state: {
                edmStor: edmStorld
              }
            };
            if (docType !== "type1") { push(location); }
          }
        })}
        rowClassName={({ docType }) => (docType !== "type1" ? "add-cursor" : "")}
      />
      {error && <RefetchButton refetch={refetch} />}
    </>
  );
}
FoldersList.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      fileName: PropTypes.string,
      isFolder: PropTypes.boolean,
      createdOn: PropTypes.date,
      fileSize: PropTypes.boolean,
      isStarred: PropTypes.boolean,
      isSharedDoc: PropTypes.boolean,
      isSharedFolder: PropTypes.boolean,
      edmStorld: PropTypes.number,
      isArchived: PropTypes.boolean
    })
  ),
  total: PropTypes.number,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  query: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  folderNavigate: PropTypes.func.isRequired
};
FoldersList.defaultProps = {
  data: null,
  total: 0
};

export default FoldersList;
