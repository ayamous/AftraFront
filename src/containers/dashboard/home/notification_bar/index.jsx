import React from "react";
import { Trans } from "react-i18next";
import { Avatar } from "antd";
import { BellOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

function NotificationBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Avatar size={70} shape="square" icon={<BellOutlined />} />
      </div>
      <div>
        <h4 className={styles.header}>
          <Trans>Lorem Ipsum dolor set amet Consectetur</Trans>
        </h4>
        <p className={styles.paragraph}>
          <Trans>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim
          </Trans>
        </p>
      </div>
    </div>
  );
}

export default NotificationBar;
