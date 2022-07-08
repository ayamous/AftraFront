import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Item } = AntBreadcrumb;

function Breadcrumb(props) {
  const { items } = props;
  const cloned = [...items];
  const lastElm = cloned.pop();

  return (
    <AntBreadcrumb>
      {cloned.map(({ name, path }) => (
        <Item key={`${name}${path}`}>
          <Link to={path}>{name}</Link>
        </Item>
      ))}
      <Item>
        <span style={{ cursor: "default" }}>{lastElm.name}</span>
      </Item>
    </AntBreadcrumb>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired
};

export default Breadcrumb;
