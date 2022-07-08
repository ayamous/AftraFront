/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { documentsSetupList } from "../../../../../../services/repositories/documents/documents-setup";

function DocumentsSetupAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await documentsSetupList();
    const formatContent = content.map(({ id, techReference }) => ({
      label: techReference,
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
      placeholder={t("Référence du document")}
      {...props}
    />
  );
}

export default DocumentsSetupAutoComplete;
