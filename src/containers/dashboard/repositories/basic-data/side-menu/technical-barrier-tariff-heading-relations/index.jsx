import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddTechnicalBarrierTariffHeadingRelation from "./addTechnicalBarrierTariffHeadingRelation";
import TechnicalBarrierTariffHeadingRelationTable from "./technicalBarrierTariffHeadingRelationTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTCTariffsRelationsByFile,
  TCTariffsRelationsList,
  TCTariffsRelationsListId,
  downloadTCTariffsRelations
} from "../../../../../../services/repositories/basic-data/technical-barrier-tariff-relations";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function TechnicalBarrierTariffHeadingRelationTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [TCTariffsRelationsListId, currentPage],
    () => TCTariffsRelationsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Relation barrière techniques - positions");
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
      name: t("Relation barrière techniques - positions")
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addTCTariffsRelationsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTechnicalBarrierTariffHeadingRelation}
      addLabel={t("Ajouter une relation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/tech_barrier_tariff_book_template.xlsx"
      downloadHandler={downloadTCTariffsRelations}
    >
      <TechnicalBarrierTariffHeadingRelationTable
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

export default TechnicalBarrierTariffHeadingRelationTab;
