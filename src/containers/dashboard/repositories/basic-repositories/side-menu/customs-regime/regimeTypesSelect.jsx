import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

function RegimeTypesSelect(props) {
  const { defaultValue, ...restProps } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Select defaultValue={defaultValue} {...restProps}>
      <Option value="IMPORT">IMPORT</Option>
      <Option value="EXPORT">EXPORT</Option>
      <Option value="TRANSIT">TRANSIT</Option>
    </Select>
  );
}

RegimeTypesSelect.propTypes = {
  defaultValue: PropTypes.oneOf(["IMPORT", "EXPORT", "TRANSIT"]),
  restProps: PropTypes.shape({
    onChange: PropTypes.func
  })
};

RegimeTypesSelect.defaultProps = {
  defaultValue: null,
  restProps: {}
};
export default RegimeTypesSelect;
