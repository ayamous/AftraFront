import React, { useState } from "react";
import {
  Button, Input, Dropdown, Menu
} from "antd";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import styles from "./styles.module.scss";
import FoldersList from "./folders-list";
import { documentsList, eSafeDocumentsListID } from "../../../services/e-safe";
import AddFolder from "./add-folder";
import UploadFile from "./upload/upload-file";
import UploadFolder from "./upload/upload-folder";
import Tree from "../../../components/tree";
import { ItemsPerPage } from "../../../configs/constants";

const { Search } = Input;
function ESafe() {
  const [currentPage, setCurrentPage] = useState(0);
  const { push } = useHistory();
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [eSafeDocumentsListID, currentPage],
    () => documentsList(currentPage, ItemsPerPage)
  );

  const [addCase, setAddCase] = useState(0);

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;

  // must mange folders navigation here in query
  const query = (queryItem) => {
    console.log("queryItem", queryItem);
  };

  const discard = () => setAddCase(0);

  const folderNavigate = (folder) => {
    setAddCase(0);
    console.log("folder navifation fn", folder);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setAddCase(1)}>
        <Trans>Créer un dossier</Trans>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => setAddCase(2)}>
        <Trans>Importer un fichier</Trans>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setAddCase(3)}>
        <Trans>Importer un dossier</Trans>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Search
          placeholder="search by referance"
          className={styles.searchBar}
          onSearch={(value) => query("reference", value)}
        />
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button type="primary">
            <Trans>Nouveau</Trans>
          </Button>
        </Dropdown>
      </div>
      <section className={styles.table}>
        <Tree
          items={[
            {
              name: "root",
              onClick: () => {
                push("/dashboard/e-safe/navigation/root");
              }
            },
            {
              name: "folder-1",
              onClick: () => {
                push("/dashboard/e-safe");
              }
            },
            { name: "folder-3", onClick: () => folderNavigate("clicked") }
          ]}
        />
        {addCase === 1 && <AddFolder discard={discard} />}
        {addCase === 2 && <UploadFile discard={discard} />}
        {addCase === 3 && <UploadFolder discard={discard} />}
        <FoldersList
          error={isError}
          loading={isLoading}
          data={content}
          refetch={refetch}
          total={total}
          current={currentPage + 1}
          setPage={setCurrentPage}
          query={query}
          folderNavigate={folderNavigate}
        />
      </section>
    </div>
  );
}

export default ESafe;
