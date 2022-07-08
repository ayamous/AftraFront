import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import DocumentsSetUpTable from "./documentsSetUpTable";
import AddDocumentSetUp from "./addDocumentSetUp";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentsSetupByFile,
  documentsSetupList,
  documentsSetupListId,
  downloadDocumentsSetup
} from "../../../../../../services/repositories/documents/documents-setup";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function DocumentsSetUpTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [documentsSetupListId, currentPage],
    () => documentsSetupList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;
  const tabName = t("Documents Setup");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Documents"),
      path: repositoriesRoutes[3].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addDocumentsSetupByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddDocumentSetUp}
      addLabel={t("Ajouter un document setup")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/documents_setup_template.xlsx"
      downloadHandler={downloadDocumentsSetup}
    >
      <DocumentsSetUpTable
        error={isError}
        loading={isLoading}
        data={content}
        refetch={refetch}
        total={total}
        current={currentPage + 1}
        setPage={setCurrentPage}
        v
      />
    </TabFormController>
  );
}

export default DocumentsSetUpTab;
