/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { usersProfilesList } from "../../../../../../services/repositories/data-actors/user-profiles";

function UsersProfilesAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await usersProfilesList();
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

export default UsersProfilesAutoComplete;
