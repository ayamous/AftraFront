import React from "react";
import { Trans } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

function StatusTypes(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Select {...props}>
      <Option value="ENABLED">
        <Trans>Activé</Trans>
      </Option>
      <Option value="SUSPENDED">
        <Trans>Suspendu</Trans>
      </Option>
      <Option value="DISABLED">
        <Trans>Désacivé</Trans>
      </Option>
    </Select>
  );
}

export default StatusTypes;
