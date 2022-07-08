/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { tariffVersionsList } from "../../../../../../services/repositories/basic-data/tariff-versions";

function TariffVersionsAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await tariffVersionsList();
    const formatContent = content.map(({ id, version }) => ({
      label: version,
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
      placeholder={t("Version du position tarifaire")}
      {...props}
    />
  );
}

export default TariffVersionsAutoComplete;
