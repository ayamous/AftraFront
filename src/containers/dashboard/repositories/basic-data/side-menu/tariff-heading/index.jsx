import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import TariffHeadingTable from "./tariffHeadingTable";
import AddTariffHeading from "./addTariffHeading";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTariffHeadingsByFile,
  tariffHeadingsList,
  tariffHeadingsListId,
  downloadTariffHeadings
} from "../../../../../../services/repositories/basic-data/tariff-headings";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function TariffHeadingTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [tariffHeadingsListId, currentPage],
    () => tariffHeadingsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Positions tarifaires");
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
    addTariffHeadingsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTariffHeading}
      addLabel={t("Ajouter une position tarifaire")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/tariff_book_template.xlsx"
      downloadHandler={downloadTariffHeadings}
    >
      <TariffHeadingTable
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

export default TariffHeadingTab;
