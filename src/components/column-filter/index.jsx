import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Input } from "antd";
import styles from "./styles.module.scss";

const { Search } = Input;

function ColumnFilter(props) {
  const { search } = props;
  const { t } = useTranslation();

  const onSearchHandler = (value) => {
    if (!value) return;
    const clean = value.trim();
    if (!clean) return;
    search(clean);
  };

  const reset = () => {
    search(null);
  };

  return (
    <div className={styles.container}>
      <div>
        <Search placeholder={t("rechercher...")} onSearch={onSearchHandler} />
      </div>
      <div className={styles.alignRight}>
        <Button
          type="primary"
          className={styles.button}
          size="small"
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

ColumnFilter.propTypes = {
  search: PropTypes.func.isRequired
};

export default ColumnFilter;
