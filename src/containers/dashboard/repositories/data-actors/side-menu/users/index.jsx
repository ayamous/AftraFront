import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddUser from "./addUser";
import UsersTable from "./usersTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addUsersFile,
  usersList,
  usersListId,
  downloadUsers
} from "../../../../../../services/repositories/data-actors/users";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function UsersTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [usersListId, currentPage],
    () => usersList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;

  const tabName = t("Utilisateurs");
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
    addUsersFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddUser}
      addLabel={t("Ajouter un utilisateur")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/users_template.xlsx"
      downloadHandler={downloadUsers}
    >
      <UsersTable
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

export default UsersTab;
