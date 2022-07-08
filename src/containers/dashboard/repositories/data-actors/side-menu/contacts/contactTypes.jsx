import React from "react";
import { Trans } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

function ContactTypes(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Select {...props}>
      <Option value="principal">
        <Trans>Principale</Trans>
      </Option>
      <Option value="secondaire">
        <Trans>Secondaire</Trans>
      </Option>
    </Select>
  );
}

export default ContactTypes;
