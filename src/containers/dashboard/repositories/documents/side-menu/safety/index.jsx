import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SafetyTable from "./safetyTable";
import AddSafety from "./addSafety";
import TabFormController from "../../../../../../components/tab-form";
import mockData from "./mockData";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";

function SafetyTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const tabName = t("Coffre-fort numérique");
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

  const addByFile = (file) => {
    console.log("add by file handler", file);
  };
  const search = () => {};
  const downloadReference = () => {};

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddSafety}
      addLabel={t("Ajout Coffre fort numérique")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/test.xlsx"
      downloadHandler={downloadReference}
    >
      <SafetyTable
        error={false}
        loading={false}
        data={mockData}
        refetch={() => {}}
        total={10}
        current={currentPage}
        setPage={setCurrentPage}
      />
    </TabFormController>
  );
}

export default SafetyTab;
