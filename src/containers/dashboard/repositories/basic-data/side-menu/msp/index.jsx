import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddMSP from "./addMSP";
import MSPsTable from "./MSPsTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addMSPsByFile,
  MSPsList,
  MSPsListId,
  downloadMSP
} from "../../../../../../services/repositories/basic-data/msp";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function SanitaryMeasuresAndPhytosanitaryTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [MSPsListId, currentPage],
    () => MSPsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Mesures sanitaires et phytosanitaires");
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
    addMSPsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddMSP}
      addLabel={t("Ajouter une MSP")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/msps_template.xlsx"
      downloadHandler={downloadMSP}
    >
      <MSPsTable
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

export default SanitaryMeasuresAndPhytosanitaryTab;
