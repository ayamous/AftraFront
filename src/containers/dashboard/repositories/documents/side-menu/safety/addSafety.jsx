import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { notifyUserSuccess } from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";

const { Item } = Form;

function AddSafety(props) {
  const { discard } = props;
  const { t } = useTranslation();

  const addSafety = (values) => {
    console.log("values===>", values);
    discard();
    notifyUserSuccess(t("Coffre-fort numérique ajoutée"));
  };

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un coffre-fort numérique")}
      onSubmit={addSafety}
    >
      <Item
        name="document"
        label={t("Référence du document")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="repo"
        label={t("Nom du document ou répertoire")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item name="isRepositoryShareable" label={t("Répertoire partageable")}>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Item>
      <Item name="isDocumentShareable" label={t("Document partageable")}>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </Item>
    </AddRowForm>
  );
}

AddSafety.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddSafety;
