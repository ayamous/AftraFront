import React, { useState } from "react";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import {
  Upload, Form, Button, Typography
} from "antd";
import {
  CloseCircleOutlined,
  CloudUploadOutlined,
  DownloadOutlined,
  SubnodeOutlined
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import { success, failure } from "../../utils/notify-user";

const { Dragger } = Upload;
const { Item } = Form;
const { Title } = Typography;

function FileImport(props) {
  const { templateSrc, onSubmit, cancel } = props;
  const { t } = useTranslation();
  const [filePresent, setFilePresent] = useState(true);
  const [acFile, setAcFile] = useState(null);

  const uploadHandler = (file) => {
    setAcFile(file);
    return false;
  };

  const onSubmitHandler = () => {
    if (!acFile) {
      setFilePresent(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", acFile);
    onSubmit(formData)
      .then(() => {
        success(t("Ajout en lot effectué"));
        cancel();
      })
      .catch(() => failure(t("Upload échoué")));
  };

  return (
    <div className={styles.container}>
      <Title level={5}>
        <Trans>Ajouter en lot</Trans>
      </Title>
      <Form name="importFileForm" onFinish={onSubmitHandler}>
        <Item>
          <span className={filePresent ? "" : styles.required}>
            <Dragger
              name="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              beforeUpload={uploadHandler}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined
                  className={filePresent ? "" : styles.requiredIcon}
                />
              </p>
              <p className="ant-upload-text">
                <Trans>
                  Cliquez ou faites glisser le fichier dans cette zone
                </Trans>
              </p>
              <p className="ant-upload-hint">
                <Trans>
                  Vous pouvez télécharger le template du fichier puis le
                  modifier pour éviter les problèmes du structure
                </Trans>
              </p>
            </Dragger>
          </span>
          {!filePresent && !acFile && (
            <small className={styles.requiredIcon}>
              <Trans>Importer votre fichier Excel</Trans>
            </small>
          )}
        </Item>
        <Item noStyle>
          <div className={styles.actions}>
            <Button type="link" icon={<DownloadOutlined />}>
              <a href={templateSrc} target="_blank" rel="noreferrer">
                <Trans>Télécharger le template</Trans>
              </a>
            </Button>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={cancel}
              className={styles.disButton}
            >
              <Trans>Annuler</Trans>
            </Button>
            <Button type="primary" htmlType="submit" icon={<SubnodeOutlined />}>
              <Trans>Soumettre</Trans>
            </Button>
          </div>
        </Item>
      </Form>
    </div>
  );
}

FileImport.propTypes = {
  templateSrc: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

FileImport.defaultProps = {
  templateSrc: ""
};

export default FileImport;
