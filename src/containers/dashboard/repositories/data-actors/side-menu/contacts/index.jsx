import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import ContactsTable from "./contactsTable";
import AddContact from "./addContact";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addContactsByFile,
  contactsList,
  contactsListId,
  downloadContacts
} from "../../../../../../services/repositories/data-actors/contact";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function ContactsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [contactsListId, currentPage],
    () => contactsList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;

  const tabName = t("Contacts");
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
    addContactsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddContact}
      addLabel={t("Ajouter un contact")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/contacts_template.xlsx"
      downloadHandler={downloadContacts}
    >
      <ContactsTable
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

export default ContactsTab;
