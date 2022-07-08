/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { chaptersList } from "../../../../../../services/repositories/basic-data/chapters";

function ChaptersAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await chaptersList();
    const formatContent = content.map(({ chapterRefCode, chapterRefId }) => ({
      label: chapterRefCode,
      value: chapterRefId
    }));
    setOptions(formatContent);
  }, []);

  return (
    <Select
      showSearch
      options={options}
      style={{ width: "100%" }}
      optionFilterProp="label"
      placeholder={t("chapters")}
      {...props}
    />
  );
}

export default ChaptersAutoComplete;
