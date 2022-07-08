import React from "react";
import { Card, Row, Col } from "antd";
import { useTranslation, Trans } from "react-i18next";
import styles from "./styles.module.scss";
import FolderItem from "./folder-item";
import NotificationBar from "./notification_bar";
import DocumentItem from "./document-item";

import mockData from "./mockData";
import mochData2 from "./mochData2";

function DashboardHome() {
  const { t } = useTranslation();
  const name = "Hamdaoui Youssef";

  return (
    <div className={styles.home}>
      <div className={styles.backgroundImage}>
        <img src="images/image-bg.png" alt="" />
        <div>
          <h1 className={styles.header1}>
            <Trans>Bonjour</Trans>
            <span>{name}</span>
          </h1>
          <h3 className={styles.header3}>
            <Trans>Bienvenue dans votre Espace</Trans>
          </h3>
        </div>
      </div>
      <Row className={styles.lean}>
        <Col span={12}>
          <NotificationBar />
          <Card
            title={t("Derniers Dossiers Créés")}
            className={styles.foldersCard}
          >
            {mockData.map(({ code, date, whatever }) => (
              <FolderItem
                key={code}
                code={code}
                date={date}
                whatever={whatever}
              />
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={t("E-Safe Derniers resources ajoutéés")}
            className={styles.eSafeCard}
          >
            {mochData2.map(({
              id, title, author, operator
            }) => (
              <DocumentItem
                key={id}
                title={title}
                author={author}
                operator={operator}
              />
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardHome;
