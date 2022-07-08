import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddProcedure from "./addProcedure";
import ProceduresTable from "./proceduresTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addProceduresByFile,
  proceduresList,
  proceduresListId,
  downloadProcedures
} from "../../../../../../services/repositories/basic-data/procedures";
import { refetchFailure } from "../../../../../../utils";

function ProceduresTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [proceduresListId, currentPage],
    () => proceduresList(currentPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Procédures");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Data de base"),
      path: repositoriesRoutes[5].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addProceduresByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddProcedure}
      addLabel={t("Ajouter une procédure")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/national_procedures_template.xlsx"
      downloadHandler={downloadProcedures}
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
