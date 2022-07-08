import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddMSPRegime from "./addMSPRegime";
import MSPRegimesTable from "./MSPRegimesTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addMSPCustomsRelationsByFile,
  MSPCustomsRelationsList,
  MSPCustomsRelationsListId,
  downloadMSPCustomsRelations
} from "../../../../../../services/repositories/basic-data/msp-customs-relations";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function MSPRegimeTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [MSPCustomsRelationsListId, currentPage],
    () => MSPCustomsRelationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("MSP Régimes");
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
    addMSPCustomsRelationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddMSPRegime}
      addLabel={t("Ajouter une relation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/msp_customs_template.xlsx"
      downloadHandler={downloadMSPCustomsRelations}
    >
      <MSPRegimesTable
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

export default MSPRegimeTab;
