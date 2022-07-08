import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import TransportationTypesTable from "./transportationTypesTable";
import AddTransportationType from "./addTransportationType";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTransportationTypeByFile,
  transportationTypesList,
  transportationTypesListId,
  downloadTransportationTypes
} from "../../../../../../services/repositories/basic-repositories/transporation-types";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function TransportationTypesTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [transportationTypesListId, currentPage],
    () => transportationTypesList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Types de transportation");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Référentiels de base"),
      path: repositoriesRoutes[1].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addTransportationTypeByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTransportationType}
      addLabel={t("Ajouter un type de transportation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/declaration_types_template.xlsx"
      downloadHandler={downloadTransportationTypes}
    >
      <TransportationTypesTable
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

export default TransportationTypesTab;
