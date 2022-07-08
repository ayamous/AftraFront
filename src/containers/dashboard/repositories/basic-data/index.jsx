import React from "react";
import BasicDataAsideMenu from "./side-menu";
import styles from "./styles.module.scss";

function BasicData() {
  return (
    <div className={styles.container}>
      <BasicDataAsideMenu />
    </div>
  );
}

export default BasicData;
