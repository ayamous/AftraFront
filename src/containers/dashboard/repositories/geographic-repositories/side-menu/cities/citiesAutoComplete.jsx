/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { citiesList } from "../../../../../../services/repositories/geographic-repositories/cities";

function CitiesAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await citiesList();
    const formatContent = content.map(({ cityRefId, reference }) => ({
      label: reference,
      value: cityRefId
    }));
    setOptions(formatContent);
  }, []);

  return (
    <Select
      showSearch
      options={options}
      style={{ width: "100%" }}
      optionFilterProp="label"
      placeholder={t("Villes")}
      {...props}
    />
  );
}

export default CitiesAutoComplete;
