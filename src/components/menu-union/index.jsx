import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function MenuUnion(props) {
  const { items } = props;

  const displayItem = (label, to) => (
    <Button className={styles.button}>
      <Link to={to}>{label}</Link>
    </Button>
  );

  const displayList = (list) => list.map(({ label, to }) => displayItem(label, to));

  return (
    <div className={styles.center}>
      <span>{displayList(items.col1)}</span>
      <span>{displayList(items.col2)}</span>
    </div>
  );
}

MenuUnion.propTypes = {
  items: PropTypes.shape({
    col1: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string
      })
    ),
    col2: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string
      })
    )
  }).isRequired
};

export default MenuUnion;
