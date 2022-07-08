import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Button, Form, Input, message, Typography, Select
} from "antd";
import {
  CloseCircleOutlined,
  DownloadOutlined,
  PlusOutlined,
  SubnodeOutlined
} from "@ant-design/icons";
import Breadcrumb from "../../../../../../components/breadcrumb";
import CustomsTable from "./customsTable";
import styles from "../sharedStyles.module.scss";
import FileImport from "../../../../../../components/file-import";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

function CustomsTab() {
  const { t } = useTranslation();
  const [addCase, setAddCase] = useState(false);
  const [addFileCase, setAddFileCase] = useState(false);
  const items = [
    {
      name: t("Réferentiel"),
      path: "/dashboard/referential"
    },
    {
      name: t("Réferentiel de base"),
      path: "/dashboard/referential/basic"
    },
    {
      name: t("Régimes douaniers")
    }
  ];

  function addCustom(values) {
    console.log("values===>", values);
    setAddCase(false);
    message.success(t("Langue ajoutée"));
  }

  return (
    <div>
      <Breadcrumb items={items} />
      <div className={styles.header}>
        <Title level={1}>
          <Trans>Régimes Douaniers</Trans>
        </Title>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          className={styles.downloadButton}
        >
          <Trans>Télécharger Réferentiel</Trans>
        </Button>
      </div>

      <section className={styles.container}>
        <div className={styles.additionArea}>
          <Search
            className={styles.searchBar}
            placeholder={t("Recherche...")}
          />
          <span>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setAddFileCase(false);
                setAddCase(true);
              }}
            >
              <Trans>Ajouter un régime</Trans>
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setAddCase(false);
                setAddFileCase(true);
              }}
            >
              <Trans>Ajouter en lot</Trans>
            </Button>
          </span>
        </div>
        {addFileCase && (
          <FileImport
            templateSrc="/resources/test.xlsx"
            onSubmit={(file) => console.log(file)}
            cancel={() => setAddFileCase(false)}
          />
        )}
        {addCase && (
          <div className={styles.addWrapper}>
            <Title level={5}>
              <Trans>Ajouter un régime douanier</Trans>
            </Title>
            <Form
              name="customized_form_controls"
              onFinish={addCustom}
              layout="inline"
            >
              <Form.Item
                name="code"
                label={t("code")}
                required
                rules={[{ required: true, message: t("champ requis") }]}
                hasFeedback
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                name="type"
                label={t("type")}
                required
                rules={[{ required: true, message: t("champ requis") }]}
                hasFeedback
              >
                <Select style={{ width: "120px" }}>
                  <Option value="IMPORT">IMPORT</Option>
                  <Option value="EXPORT">EXPORT</Option>
                  <Option value="TRANSIT">TRANSIT</Option>
                </Select>
              </Form.Item>
              <Form.Item noStyle>
                <div className={styles.addActions}>
                  <Button
                    icon={<CloseCircleOutlined />}
                    onClick={() => setAddCase(false)}
                    className={styles.disButton}
                  >
                    <Trans>Discard</Trans>
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SubnodeOutlined />}
                  >
                    <Trans>Soumettre</Trans>
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        )}
        <CustomsTable />
      </section>
    </div>
  );
}

export default CustomsTab;
