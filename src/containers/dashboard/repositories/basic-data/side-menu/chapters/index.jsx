import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import ChaptersTable from "./chaptersTable";
import AddChapter from "./addChapter";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addChaptersByFile,
  chaptersList,
  chaptersListId,
  downloadChapters
} from "../../../../../../services/repositories/basic-data/chapters";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function ChaptersTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [chaptersListId, currentPage],
    () => chaptersList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Chapitres");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Data de base"),
      path: repositoriesRoutes[5].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addChaptersByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddChapter}
      addLabel={t("Ajouter un chapitre")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/chapters_template.xlsx"
      downloadHandler={downloadChapters}
    >
      <ChaptersTable
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

export default ChaptersTab;
