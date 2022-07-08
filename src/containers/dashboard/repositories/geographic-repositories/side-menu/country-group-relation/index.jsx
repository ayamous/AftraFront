import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import CountryGroupRelationTable from "./countryGroupRelationTable";
import AddCountryGroupRelation from "./addCountryGroupRelation";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addCountryGroupRelationsByFile,
  countryGroupRelationsList,
  countryGroupRelationsListId,
  downloadCountryGroupRelation
} from "../../../../../../services/repositories/geographic-repositories/country-group-relations";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function CountryGroupRelationTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [countryGroupRelationsListId, currentPage],
    () => countryGroupRelationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Relation Pays-Groupements");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Référentiels de base"),
      path: repositoriesRoutes[2].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addCountryGroupRelationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddCountryGroupRelation}
      addLabel={t("Ajouter un pays à un groupement")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/countries_group_relations_template.xlsx"
      downloadHandler={downloadCountryGroupRelation}
    >
      <CountryGroupRelationTable
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

export default CountryGroupRelationTab;
