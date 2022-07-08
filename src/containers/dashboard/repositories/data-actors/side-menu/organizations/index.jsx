import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import OrganizationsTable from "./organizationsTable";
import AddOrganization from "./addOrganization";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addOrganisationsByFile,
  organisationsList,
  organisationsListId,
  downloadOrganisations
} from "../../../../../../services/repositories/data-actors/organisations";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function OrganizationsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [organisationsListId, currentPage],
    () => organisationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Organisations");
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
    addOrganisationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddOrganization}
      addLabel={t("Ajouter une organisation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/organisations_template.xlsx"
      downloadHandler={downloadOrganisations}
    >
      <OrganizationsTable
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

export default OrganizationsTab;
