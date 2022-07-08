import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "antd";
import { CloseCircleOutlined, SubnodeOutlined } from "@ant-design/icons";
import { Trans } from "react-i18next";
import styles from "./styles.module.scss";

const { Item } = Form;
function AddFormActions(props) {
  const { discard, loading } = props;
  return (
    <Item noStyle>
      <div className={styles.addActions}>
        <Button
          icon={<CloseCircleOutlined />}
          onClick={discard}
          className={styles.disButton}
          disabled={loading}
        >
          <Trans>Annuler</Trans>
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SubnodeOutlined />}
          disabled={loading}
        >
          <Trans>Soumettre</Trans>
        </Button>
      </div>
    </Item>
  );
}

AddFormActions.propTypes = {
  discard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default AddFormActions;
