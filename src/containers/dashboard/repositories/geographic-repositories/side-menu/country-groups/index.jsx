import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import CountryGroupsTable from "./countryGroupsTable";
import AddCountryGroup from "./addCountryGroup";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  countriesGroupList,
  countriesGroupListId,
  addCountriesGroupByFile,
  downloadCountriesGroups
} from "../../../../../../services/repositories/geographic-repositories/countries-group";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function CountryGroupsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [countriesGroupListId, currentPage],
    () => countriesGroupList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Groupements des pays");
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
    addCountriesGroupByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddCountryGroup}
      addLabel={t("Ajouter un groupement")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/countries_group_template.xlsx"
      downloadHandler={downloadCountriesGroups}
    >
      <CountryGroupsTable
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

export default CountryGroupsTab;
