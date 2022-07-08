import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import styles from "./syles.module.scss";
import "./override.scss";
import repositoriesRoutes from "../../router/dashboard-routes/repositoriesRoutes";

const { Sider: AntSider } = Layout;
const { SubMenu, Item } = Menu;

function Sider() {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();
  const routeItems = pathname.split("/");
  const sub = routeItems[2];

  return (
    <AntSider
      className={styles.sider}
      collapsible
      trigger={null}
      collapsed={collapsed}
    >
      <div className={styles.logo}>
        <Link to="/dashboard">
          {collapsed ? (
            <img
              src="/logo/logo.png"
              className={styles.collapsedBaseLogo}
              alt="Aftra"
            />
          ) : (
            <img
              src="/logo/logo-aftra.png"
              className={styles.baseLogo}
              alt="Aftra"
            />
          )}
        </Link>
      </div>
      {collapsed ? (
        <MenuUnfoldOutlined
          onClick={() => setCollapsed((prev) => !prev)}
          className={styles.trigger}
        />
      ) : (
        <MenuFoldOutlined
          onClick={() => setCollapsed((prev) => !prev)}
          className={styles.trigger}
        />
      )}
      <Menu
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[sub]}
      >
        <SubMenu
          key="referential"
          title={(
            <span className={styles.menuItem}>
              <Trans>Référentiels</Trans>
            </span>
          )}
          icon={<FileTextOutlined />}
        >
          <Item key={repositoriesRoutes[1].path}>
            <Link
              to={repositoriesRoutes[1].path}
              title={t("Référentiels de base")}
            >
              <span className={styles.menuSubItem}>
                <Trans>Référentiels de base</Trans>
              </span>
            </Link>
          </Item>
          <Item key={repositoriesRoutes[2].path}>
            <Link
              to={repositoriesRoutes[2].path}
              title={t("Référentiels géographiques")}
            >
              <span className={styles.menuSubItem}>
                <Trans>Référentiels géographiques</Trans>
              </span>
            </Link>
          </Item>
          <Item key={repositoriesRoutes[3].path}>
            <Link to={repositoriesRoutes[3].path} title={t("Documents")}>
              <span className={styles.menuSubItem}>
                <Trans>Documents</Trans>
              </span>
            </Link>
          </Item>
          <Item key={repositoriesRoutes[4].path}>
            <Link
              to={repositoriesRoutes[4].path}
              title={t("Data Acteurs et Accès")}
            >
              <span className={styles.menuSubItem}>
                <Trans>Data Acteurs et Accès</Trans>
              </span>
            </Link>
          </Item>
          <Item key={repositoriesRoutes[5].path}>
            <Link to={repositoriesRoutes[5].path} title={t("Data de Base")}>
              <span className={styles.menuSubItem}>
                <Trans>Data de Base</Trans>
              </span>
            </Link>
          </Item>
          <Item key={repositoriesRoutes[6].path}>
            <Link
              to={repositoriesRoutes[6].path}
              title={t("Internationalisation des Tables des Reférences")}
            >
              <span className={styles.menuSubItem}>
                <Trans>Internationalisation des Tables des Reférences</Trans>
              </span>
            </Link>
          </Item>
        </SubMenu>

        <Item
          key="/dashboard/e-safe"
          icon={
            <img className={styles.icon} src="/icons/shield.png" alt="e-safe" />
          }
        >
          <Link to="/dashboard/e-safe">
            <span className={styles.menuItem}>
              <Trans>E-SAFE</Trans>
            </span>
          </Link>
        </Item>
      </Menu>
    </AntSider>
  );
}

export default Sider;
