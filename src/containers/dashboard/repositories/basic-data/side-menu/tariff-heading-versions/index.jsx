import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddVersion from "./addVersion";
import VersionsTable from "./versionsTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTariffVersionsByFile,
  tariffVersionsList,
  tariffVersionsListId,
  downloadTariffVersions
} from "../../../../../../services/repositories/basic-data/tariff-versions";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function TariffHeadingVersionsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [tariffVersionsListId, currentPage],
    () => tariffVersionsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Versions des positions tarifaires");
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
    addTariffVersionsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddVersion}
      addLabel={t("Ajouter une relation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/tariff_versions_template.xlsx"
      downloadHandler={downloadTariffVersions}
    >
      <VersionsTable
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

export default TariffHeadingVersionsTab;
