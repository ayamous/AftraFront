import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddExportCountry from "./addExportCountry";
import ExportCountryTable from "./exportCountryTable";
import TabFormController from "../../../../../../components/tab-form";

import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentDestinationCountryByFile,
  documentDestinationCountryList,
  documentDestinationCountryListId,
  downloadDocumentDestinationCountry
} from "../../../../../../services/repositories/documents/destination-country";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function ExportCountryTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [documentDestinationCountryListId, currentPage],
    () => documentDestinationCountryList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Pays destination");

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
    addDocumentDestinationCountryByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddExportCountry}
      addLabel={t("Ajouter un pays destination")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/documents_country_destination_template.xlsx"
      downloadHandler={downloadDocumentDestinationCountry}
    >
      <ExportCountryTable
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

export default ExportCountryTab;
