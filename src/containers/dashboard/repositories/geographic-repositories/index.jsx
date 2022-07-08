import React from "react";
import styles from "../basic-repositories/styles.module.scss";
import GeographicRefAsideMenu from "./side-menu";

function GeographicReferential() {
  return (
    <div className={styles.container}>
      <GeographicRefAsideMenu />
    </div>
  );
}

export default GeographicReferential;
