import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Typography } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Trans, useTranslation } from "react-i18next";
import Breadcrumb from "../breadcrumb";
import FileImport from "../file-import";
import styles from "./styles.module.scss";

const { Search } = Input;
const { Title } = Typography;

function TabFormController(props) {
  const {
    tabName,
    items,
    AddRowComponent,
    addLabel,
    addFileHandler,
    templateSrc,
    searchHandler,
    downloadHandler,
    children
  } = props;

  const { t } = useTranslation();
  const [addCase, setAddCase] = useState(false);
  const [addFileCase, setAddFileCase] = useState(false);

  return (
    <div>
      <Breadcrumb items={items} />
      <div className={styles.header}>
        <Title level={1}>{tabName}</Title>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          className={styles.downloadButton}
          onClick={downloadHandler}
        >
          <Trans>Télécharger Réferentiel</Trans>
        </Button>
      </div>
      <section className={styles.container}>
        <div className={styles.additionArea}>
          <Search
            className={styles.searchBar}
            placeholder={t("Recherche...")}
            onSearch={searchHandler}
          />
          <span>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setAddFileCase(false);
                setAddCase(true);
              }}
              className={styles.addButton}
            >
              {addLabel}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setAddCase(false);
                setAddFileCase(true);
              }}
              className={styles.addButtonMulti}
            >
              <Trans>Ajouter en lot</Trans>
            </Button>
          </span>
        </div>
        {addFileCase && (
          <FileImport
            templateSrc={templateSrc}
            onSubmit={(file) => addFileHandler(file)}
            cancel={() => setAddFileCase(false)}
          />
        )}
        {addCase && <AddRowComponent discard={() => setAddCase(false)} />}
        {children}
      </section>
    </div>
  );
}

TabFormController.propTypes = {
  tabName: PropTypes.string.isRequired,
  addLabel: PropTypes.string.isRequired,
  templateSrc: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string
    })
  ).isRequired,
  addFileHandler: PropTypes.func.isRequired,
  searchHandler: PropTypes.func.isRequired,
  downloadHandler: PropTypes.func.isRequired,
  AddRowComponent: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default TabFormController;
