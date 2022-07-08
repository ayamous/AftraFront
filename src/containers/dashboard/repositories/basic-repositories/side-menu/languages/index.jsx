import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddLanguage from "./addLanguage";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  languagesList,
  languagesListId,
  downloadLanguages,
  addLanguagesByFile
} from "../../../../../../services/repositories/basic-repositories/languages";
import LanguagesTable from "./languagesTable";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function LanguagesTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [languagesListId, currentPage],
    () => languagesList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;
  const tabName = t("Langues");

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
    addLanguagesByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddLanguage}
      addLabel={t("Ajouter une langue")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/languages_template.xlsx"
      downloadHandler={downloadLanguages}
    >
      <LanguagesTable
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

export default LanguagesTab;
