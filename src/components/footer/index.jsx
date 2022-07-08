import React from "react";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { Layout } from "antd";
import styles from "./styles.module.scss";
import { externalLinks } from "../../configs/constants";

const { Footer: AntFoter } = Layout;

function Separator() {
  return <span className={styles.separator}>|</span>;
}

function Footer() {
  return (
    <AntFoter className={styles.footer}>
      <div className={styles.text}>Copyright © 2020-2021</div>
      <div className={styles.nav}>
        <Link to="/dashboard" className={styles.navItem}>
          <Trans>Accueil</Trans>
        </Link>
        <Separator />
        <Link to="/" className={styles.navItem}>
          <Trans>À Propos</Trans>
        </Link>
        <Separator />
        <a
          href={externalLinks.aftraPortal}
          target="_blank"
          className={styles.navItem}
          rel="noreferrer"
        >
          <Trans>Portail Aftra</Trans>
        </a>
        <Separator />
        <Link to="/dasboard" className={styles.navItem}>
          <Trans>Contact</Trans>
        </Link>
      </div>
    </AntFoter>
  );
}

export default Footer;
