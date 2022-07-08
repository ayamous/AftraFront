/* eslint-disable max-len,react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { contactsList } from "../../../../../../services/repositories/data-actors/contact";

function ContactsAutoComplete(props) {
  const [options, setOptions] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    const { content } = await contactsList();
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
      placeholder={t("contacts")}
      {...props}
    />
  );
}

export default ContactsAutoComplete;
