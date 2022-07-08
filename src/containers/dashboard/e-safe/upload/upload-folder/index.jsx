import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  Upload,
  Button,
  Space
} from "antd";
import { useTranslation, Trans } from "react-i18next";
import { UploadOutlined } from "@ant-design/icons";
import AddRowForm from "../../../../../components/add-row-form";
import { notifyUserSuccess } from "../../../../../utils";
import { addDocumentByFile } from "../../../../../services/e-safe";

function UploadFolder(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const [folder, setFolder] = useState(null);

  const uploadHandler = (imported) => {
    setFolder(imported);
    return false;
  };

  const submit = (values) => {
    const formData = new FormData();
    formData.append("file", folder);
    console.log(values);
    const eSafeDocument = {
      fileName: folder.name,
      isFolder: true
    };
    formData.append("eSafeDocument", JSON.stringify(eSafeDocument));
    addDocumentByFile(formData);
    discard();
    notifyUserSuccess(t("Dossier créé"));
  };

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un nouveau dossier")}
      onSubmit={submit}
    >
      <Form.Item
        name="reference"
        label={t("Référence du dossier")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="file"
        label={t("folder")}
        required
        rules={[
          {
            required: true,
            message: t("Vous n’avez pas encore sélectionné le dossier")
          }
        ]}
      >
        <Upload name="folder" beforeUpload={uploadHandler} directory>
          <Button icon={<UploadOutlined />}>
            <Trans>Choisir le dossier</Trans>
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        name="expirationDate"
        label={t("Date d’expiration")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item name="faved" label={t("Favoris")}>
        <Checkbox>
          <Trans>Favoris</Trans>
        </Checkbox>
      </Form.Item>
      <Form.Item
        name="operator"
        label={t("Opératuer économique")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item name="tags" label={t("Tags")}>
        <Select mode="multiple" style={{ width: "100%" }}>
          <Select.Option value="jack1">Tag 1</Select.Option>
          <Select.Option value="jack2">Tag 2</Select.Option>
          <Select.Option value="jack3">Tag 3</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="visibility" label={t("Visibilité")} required>
        <Radio.Group defaultValue={1}>
          <Space direction="vertical">
            <Radio value={1}>
              <Trans>Globalité des membres de l’Alliance</Trans>
            </Radio>
            <Radio value={2}>
              <Trans>Toutes les organizations d’un pays membre</Trans>
            </Radio>
            <Radio value={3}>
              <Trans>
                Tous les utilisateurs d’une organisation spécifique
                {" "}
              </Trans>
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </AddRowForm>
  );
}

UploadFolder.propTypes = {
  discard: PropTypes.func.isRequired
};

export default UploadFolder;
