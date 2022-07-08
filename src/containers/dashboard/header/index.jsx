import React from "react";
import {
  Layout, Input, Avatar, Dropdown, Badge
} from "antd";
import { BellTwoTone, UserOutlined, SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import ProfileMenu from "./profile-menu";

const { Header } = Layout;

function DashboardHeader() {
  const { name, firstName, avatar } = useSelector((state) => state.AuthReducer);
  const { t } = useTranslation();
  const search = (value) => {
    console.log("seacrh..... request", value);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.inner}>
        <Input
          size="large"
          placeholder={t("rechercher")}
          onPressEnter={(v) => search(v)}
          prefix={<SearchOutlined />}
          className={styles.input}
        />
        <div className={styles.profile}>
          <div className={styles.bell}>
            <Badge dot>
              <BellTwoTone />
            </Badge>
          </div>
          <span className={styles.separator}>|</span>
          <span className={styles.name}>{firstName}</span>
          <div className={styles.avatar}>
            <Dropdown
              overlay={() => <ProfileMenu avatar={avatar} name={name} />}
            >
              {avatar ? (
                <Avatar src={avatar} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default DashboardHeader;
