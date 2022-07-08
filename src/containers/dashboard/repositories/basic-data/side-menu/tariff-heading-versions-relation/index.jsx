import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import TabFormController from "../../../../../../components/tab-form";
import AddVersionPositionRelation from "./addVersionPositionRelation";
import VersionPositionTable from "./versionPositionTable";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTariffVersionRelationsByFile,
  tariffVersionRelationsList,
  tariffVersionRelationsListId,
  downloadTariffVersionsRelations
} from "../../../../../../services/repositories/basic-data/tariff-version-ralations";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function TariffHeadingVersionRelation() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [tariffVersionRelationsListId, currentPage],
    () => tariffVersionRelationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Relation Version-Position tarifaire");
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
    addTariffVersionRelationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddVersionPositionRelation}
      addLabel={t("Ajouter une relation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/version_tariff_book_template.xlsx"
      downloadHandler={downloadTariffVersionsRelations}
    >
      <VersionPositionTable
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

export default TariffHeadingVersionRelation;
