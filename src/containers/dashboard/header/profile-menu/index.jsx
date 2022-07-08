import React from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider } from "antd";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { logout } from "../../../../stores/authentication/actions";

function ProfileMenu(props) {
  const { avatar, name } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {avatar ? (
        <Avatar size="large" src={avatar} />
      ) : (
        <Avatar size="large" icon={<UserOutlined />} />
      )}
      <h5>{name}</h5>
      <Divider />
      <Button onClick={() => dispatch(logout())}>
        <Trans>Déconnecter</Trans>
      </Button>
    </div>
  );
}

ProfileMenu.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string
};

ProfileMenu.defaultProps = {
  name: "",
  avatar: ""
};
export default ProfileMenu;
