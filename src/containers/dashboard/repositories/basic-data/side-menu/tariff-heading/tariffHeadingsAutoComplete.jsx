/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { tariffHeadingsList } from "../../../../../../services/repositories/basic-data/tariff-headings";

function TariffHeadingsAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await tariffHeadingsList();
    const formatContent = content.map(({ id, reference }) => ({
      label: reference,
      value: id
    }));
    setOptions(formatContent);
  }, []);

  return (
    <Select
      showSearch
      options={options}
      style={{ width: "100%" }}
      optionFilterProp="label"
      placeholder={t("Position tarifaire")}
      {...props}
    />
  );
}

export default TariffHeadingsAutoComplete;
