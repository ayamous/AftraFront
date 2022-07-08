import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { FileFilled } from "@ant-design/icons";
import styles from "./styles.module.scss";

function DocumentItem(props) {
  const { title, author, operator } = props;
  return (
    <div className={styles.inline}>
      <Avatar icon={<FileFilled />} />
      <span>
        <strong>{title}</strong>
      </span>
      <span>{author}</span>
      <span>{operator}</span>
    </div>
  );
}

DocumentItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired
};

export default DocumentItem;
