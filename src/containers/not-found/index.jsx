import React from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import styles from "./styles.module.scss";

const { Title } = Typography;

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.centred}>
        <img
          className={styles.image}
          src="/images/not_found.png"
          alt="not found"
        />
        <Title level={1}>404</Title>
        <Title level={4}>
          <Trans>Désolé, la page que vous avez visitée n’existe pas</Trans>
        </Title>
        <Link to="/">
          <Trans>Retourner au page d’accueil</Trans>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
