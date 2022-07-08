import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { FolderFilled } from "@ant-design/icons";
import { formatDate } from "../../../../utils";
import styles from "./styles.module.scss";

function FolderItem(props) {
  const { code, date, whatever } = props;
  return (
    <div className={styles.inline}>
      <Avatar icon={<FolderFilled />} />
      <span>
        <strong>{code}</strong>
      </span>
      <span>{formatDate(date)}</span>
      <span>{whatever}</span>
    </div>
  );
}

FolderItem.propTypes = {
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  whatever: PropTypes.string.isRequired
};

export default FolderItem;
