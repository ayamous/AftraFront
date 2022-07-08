import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Popconfirm } from "antd";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloudDownloadOutlined
} from "@ant-design/icons";

function RowActions(props) {
  const {
    edit, update, remove, inEdit, loading, cancelEdit, download
  } = props;
  const { t } = useTranslation();
  return (
    <span>
      {inEdit && update ? (
        <>
          <Button type="link" icon={<SaveOutlined />} onClick={update} />
          <Button
            type="link"
            icon={<CloseCircleOutlined />}
            onClick={cancelEdit}
          />
        </>
      ) : (
        <>
          <Popconfirm title={t("êtes-vous sûr")} onConfirm={remove}>
            <Button type="link" icon={<DeleteOutlined />} disabled={loading} />
          </Popconfirm>
          {update && (
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={edit}
              disabled={loading}
            />
          )}
          {!!download && (
            <Button
              type="link"
              icon={<CloudDownloadOutlined />}
              onClick={download}
              disabled={loading}
            />
          )}
        </>
      )}
    </span>
  );
}

RowActions.propTypes = {
  edit: PropTypes.func,
  cancelEdit: PropTypes.func,
  update: PropTypes.func,
  remove: PropTypes.func.isRequired,
  inEdit: PropTypes.bool,
  loading: PropTypes.bool,
  download: PropTypes.func
};

RowActions.defaultProps = {
  edit: null,
  update: null,
  cancelEdit: null,
  inEdit: false,
  loading: false,
  download: null
};

export default RowActions;
