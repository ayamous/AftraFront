/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { organisationsList } from "../../../../../../services/repositories/data-actors/organisations";

function OrganisationAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await organisationsList();
    const formatContent = content.map(({ id, name }) => ({
      label: name,
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
      placeholder={t("organisations")}
      {...props}
    />
  );
}

export default OrganisationAutoComplete;
