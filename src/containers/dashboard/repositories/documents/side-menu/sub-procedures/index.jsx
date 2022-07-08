import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import SubProceduresTable from "./subProceduresTable";
import AddSubProcedure from "./addSubProcedure";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentSubProceduresByFile,
  documentSubProceduresList,
  documentSubProceduresListId,
  downloadDocumentSubProcedures
} from "../../../../../../services/repositories/documents/sub-procedures";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function SubProceduresTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [documentSubProceduresListId, currentPage],
    () => documentSubProceduresList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Sous-procédures");
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
    addDocumentSubProceduresByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddSubProcedure}
      addLabel={t("Ajouter Document affecté au sous-procédure")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/document_setup_extended_procedure_template.xlsx"
      downloadHandler={downloadDocumentSubProcedures}
    >
      <SubProceduresTable
        error={isError}
        loading={isLoading}
        data={content}
        refetch={refetch}
        total={total}
        current={currentPage + 1}
        setPage={setCurrentPage}
      />
    </TabFormController>
  );
}

export default SubProceduresTab;
