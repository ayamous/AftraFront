import React from "react";
import styles from "./styles.module.scss";
import DataActorsAsideMenu from "./side-menu";

function DataActors() {
  return (
    <div className={styles.container}>
      <DataActorsAsideMenu />
    </div>
  );
}

export default DataActors;
