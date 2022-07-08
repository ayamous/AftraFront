/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { TCTariffsRelationsList } from "../../../../../../services/repositories/basic-data/technical-barrier-tariff-relations";

function TechBarriersAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await TCTariffsRelationsList();
    const formatContent = content.map(({ techBarrierRefId, techBarrierRefCode }) => ({
      label: techBarrierRefCode,
      value: techBarrierRefId
    }));
    setOptions(formatContent);
  }, []);

  return (
    <Select
      showSearch
      options={options}
      style={{ width: "100%" }}
      optionFilterProp="label"
      placeholder={t("Barrière technique")}
      {...props}
    />
  );
}

export default TechBarriersAutoComplete;
