import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import OrganizationsCategoriesTable from "./OrganizationsCategoriesTable";
import AddOrganizationCategory from "./AddOrganizationCategory";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addOrgCategoriesByFile,
  orgCategoriesList,
  orgCategoriesListId,
  downloadOrgCategories
} from "../../../../../../services/repositories/data-actors/org-categories";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function OrganizationsCategoriesTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [orgCategoriesListId, currentPage],
    () => orgCategoriesList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;
  const tabName = t("Catégories organisations");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Data Acteurs et Accès utilisateurs"),
      path: repositoriesRoutes[4].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addOrgCategoriesByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddOrganizationCategory}
      addLabel={t("Ajouter une catégorie d’organisation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/categories_organisations_template.xlsx"
      downloadHandler={downloadOrgCategories}
    >
      <OrganizationsCategoriesTable
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

export default OrganizationsCategoriesTab;
