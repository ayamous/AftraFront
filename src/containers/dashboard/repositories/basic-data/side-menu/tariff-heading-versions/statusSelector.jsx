import React from "react";
import { Trans } from "react-i18next";
import { Select } from "antd";

const { Option } = Select;

function StatusSelector(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Select {...props}>
      <Option value="VALIDATED">
        <Trans>Validé</Trans>
      </Option>
      <Option value="ARCHIVED">
        <Trans>Archivé</Trans>
      </Option>
      <Option value="APPLICATED">
        <Trans>Appliqué</Trans>
      </Option>
    </Select>
  );
}

export default StatusSelector;
