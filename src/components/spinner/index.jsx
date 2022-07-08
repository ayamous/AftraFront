import React from "react";
import { Spin } from "antd";
import styles from "./styles.module.scss";

function Spinner() {
  return (
    <div className={styles.wrapper}>
      <Spin size="200px" tip="Loading..." />
    </div>
  );
}

export default Spinner;
