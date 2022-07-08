import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddSubProcedure from "./addSubProcedure";
import SubProceduresTable from "./subProceduresTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addSubProceduresByFile,
  subProceduresList,
  subProceduresListId,
  downloadSubProcedures
} from "../../../../../../services/repositories/basic-data/sub-procedures";
import { refetchFailure } from "../../../../../../utils/notify-user";

function SubProceduresTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [subProceduresListId, currentPage],
    () => subProceduresList(currentPage)
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
      name: t("Data de base"),
      path: repositoriesRoutes[5].path
    },
    {
      name: tabName
    }
  ];
  const search = () => {};

  const addByFile = async (formData) => {
    addSubProceduresByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddSubProcedure}
      addLabel={t("Ajouter une sous procédure")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/test.xlsx"
      downloadHandler={downloadSubProcedures}
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
