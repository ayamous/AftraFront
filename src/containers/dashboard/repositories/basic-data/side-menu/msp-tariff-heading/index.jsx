import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addMSPtariffsRelationsByFile,
  MSPtariffsRelationsList,
  MSPtariffsRelationsListId,
  downloadMSPtariffsRelations
} from "../../../../../../services/repositories/basic-data/msp-tariff-relations";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";
import MSPTariffHeadingTable from "./MSPTariffHeadingTable";
import AddMSPTariffHeading from "./addMSPTariffHeading";

function MSPTariffHeadingTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [MSPtariffsRelationsListId, currentPage],
    () => MSPtariffsRelationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("MSP position tarifaire");
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
    addMSPtariffsRelationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddMSPTariffHeading}
      addLabel={t("Ajouter une relation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/msp_tariff_template.xlsx"
      downloadHandler={downloadMSPtariffsRelations}
    >
      <MSPTariffHeadingTable
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

export default MSPTariffHeadingTab;
