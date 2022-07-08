/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { sectionsList } from "../../../../../../services/repositories/basic-data/sections";

function SectionsAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await sectionsList();
    const formatContent = content.map(({ id, code }) => ({
      label: code,
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
      placeholder={t("sections")}
      {...props}
    />
  );
}

export default SectionsAutoComplete;
