import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import OriginCountryTable from "./originCountryTable";
import AddOriginCountry from "./addOriginCountry";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentOriginCountryByFile,
  documentOriginCountryList,
  documentOriginCountryListId,
  downloadDocumentOriginCountry
} from "../../../../../../services/repositories/documents/origin-country";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function OriginCountryTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [documentOriginCountryListId, currentPage],
    () => documentOriginCountryList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Pays d’origine");
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
    addDocumentOriginCountryByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddOriginCountry}
      addLabel={t("Ajouter Document affecté au pays origine")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/documents_country_origin_template.xlsx"
      downloadHandler={downloadDocumentOriginCountry}
    >
      <OriginCountryTable
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

export default OriginCountryTab;
