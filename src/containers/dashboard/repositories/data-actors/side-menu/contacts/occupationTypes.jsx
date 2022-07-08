import React from "react";
import { Trans } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

function OccupationTypes(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Select {...props}>
      <Option value="directeur">
        <Trans>Directeur</Trans>
      </Option>
      <Option value="manager">
        <Trans>Manager</Trans>
      </Option>
      <Option value="autre">
        <Trans>Autre</Trans>
      </Option>
    </Select>
  );
}

export default OccupationTypes;
