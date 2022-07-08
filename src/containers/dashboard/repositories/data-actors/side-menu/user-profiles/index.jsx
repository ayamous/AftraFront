import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import UsersProfilesTable from "./UsersProfilesTable";
import AddUserProfile from "./addUserProfile";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addUserProfilesFile,
  usersProfilesList,
  usersProfilesListId,
  downloadProfiles
} from "../../../../../../services/repositories/data-actors/user-profiles";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function UsersProfilesTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [usersProfilesListId, currentPage],
    () => usersProfilesList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;

  const tabName = t("Profils utilisateurs");
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
    addUserProfilesFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddUserProfile}
      addLabel={t("Ajouter un profil utilisateur")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/profiles_template.xlsx"
      downloadHandler={downloadProfiles}
    >
      <UsersProfilesTable
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

export default UsersProfilesTab;
