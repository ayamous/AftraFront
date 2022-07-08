import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Button, Form, Input, message, Typography
} from "antd";
import {
  CloseCircleOutlined,
  DownloadOutlined,
  PlusOutlined,
  SubnodeOutlined
} from "@ant-design/icons";
import Breadcrumb from "../../../../../../components/breadcrumb";
import MeasureUnitsTable from "./measureUnitsTable";
import styles from "../sharedStyles.module.scss";
import FileImport from "../../../../../../components/file-import";

const { Title } = Typography;
const { Search, TextArea } = Input;

function MeasureUnitsTab() {
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
      name: t("Unités de mesure")
    }
  ];

  function addMeasureUnit(values) {
    console.log("values===>", values);
    setAddCase(false);
    message.success(t("Langue ajoutée"));
  }

  return (
    <div>
      <Breadcrumb items={items} />
      <div className={styles.header}>
        <Title level={1}>
          <Trans>Unités de mesure</Trans>
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
              <Trans>Ajouter une unité de musure</Trans>
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
              <Trans>Ajouter une unité de mesure</Trans>
            </Title>
            <Form
              name="customized_form_controls"
              onFinish={addMeasureUnit}
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
                name="description"
                label={t("description")}
                style={{ flexGrow: 1 }}
              >
                <TextArea />
              </Form.Item>
              <div className={styles.actionsBlock}>
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
            </Form>
          </div>
        )}
        <MeasureUnitsTable />
      </section>
    </div>
  );
}

export default MeasureUnitsTab;
