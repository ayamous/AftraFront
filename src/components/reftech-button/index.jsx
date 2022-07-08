import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Trans } from "react-i18next";
import styles from "./styles.module.scss";

function RefetchButton(props) {
  const { refetch } = props;
  return (
    <div className={styles.container}>
      <div>
        <Trans>Une erreur s’est produite lors de l’obtention des données</Trans>
      </div>
      <div>
        <Trans>Veuillez cliquer pour réessayer</Trans>
      </div>
      <Button danger onClick={refetch}>
        <Trans>Réessayer</Trans>
      </Button>
    </div>
  );
}

RefetchButton.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default RefetchButton;
