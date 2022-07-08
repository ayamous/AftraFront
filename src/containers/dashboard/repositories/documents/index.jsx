import React from "react";
import styles from "../basic-repositories/styles.module.scss";
import DocumentsAsideMenu from "./side-menu";

function Documents() {
  return (
    <div className={styles.container}>
      <DocumentsAsideMenu />
    </div>
  );
}

export default Documents;
