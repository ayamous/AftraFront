import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb as AntBreadcrumb } from "antd";
import styles from "./styles.module.scss";

const { Item } = AntBreadcrumb;

function Tree(props) {
  const { items } = props;
  const cloned = [...items];
  const lastElm = cloned.pop();
  return (
    <AntBreadcrumb>
      {cloned.map(({ name, onClick }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={`${name}${index}`}>
          <button className={styles.button} type="button" onClick={onClick}>
            {name}
          </button>
        </Item>
      ))}
      <Item>
        <button
          className={styles.nonClickable}
          type="button"
          style={{ cursor: "default" }}
        >
          {lastElm.name}
        </button>
      </Item>
    </AntBreadcrumb>
  );
}

Tree.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.string
    })
  ).isRequired
};

export default Tree;
