import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import TariffHeadingRelationTable from "./tariffHeadingRelationTable";
import AddTariffHeadingRelation from "./addTariffHeadingRelation";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTariffTaxingRelationsByFile,
  tariffTaxingRelationsList,
  tariffTaxingRelationsListId,
  downloadTariffTaxingRelations
} from "../../../../../../services/repositories/basic-data/tariff-taxing-relations";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function TariffHeadingRelationTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [tariffTaxingRelationsListId, currentPage],
    () => tariffTaxingRelationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Relations position tarifaire");
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
    addTariffTaxingRelationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTariffHeadingRelation}
      addLabel={t("Ajouter une relation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/tariff_taxing_relation_template.xlsx"
      downloadHandler={downloadTariffTaxingRelations}
    >
      <TariffHeadingRelationTable
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

export default TariffHeadingRelationTab;
