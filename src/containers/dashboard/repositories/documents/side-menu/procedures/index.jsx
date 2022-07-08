import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import ProceduresTable from "./proceduresTable";
import AddProcedure from "./addProcedure";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentProceduresByFile,
  documentProceduresList,
  documentProceduresListId,
  downloadDocumentProcedures
} from "../../../../../../services/repositories/documents/procedures";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function ProceduresTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [documentProceduresListId, currentPage],
    () => documentProceduresList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Procédure");
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
    addDocumentProceduresByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddProcedure}
      addLabel={t("Ajoute procédure")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/document_setup_national_procedure.xlsx"
      downloadHandler={downloadDocumentProcedures}
    >
      <ProceduresTable
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

export default ProceduresTab;
