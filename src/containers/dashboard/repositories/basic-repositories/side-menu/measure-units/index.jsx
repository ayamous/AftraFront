import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import MeasureUnitsTable from "./measureUnitsTable";
import TabFormController from "../../../../../../components/tab-form";
import AddMeasureUnit from "./addMeasureUnit";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  measureUnitsList,
  measureUnitsListId,
  downloadMeasureUnits,
  addMeasureUnitsByFile
} from "../../../../../../services/repositories/basic-repositories/measure-units";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function MeasureUnitsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [measureUnitsListId, currentPage],
    () => measureUnitsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Unités de mesure");

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
    addMeasureUnitsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddMeasureUnit}
      addLabel={t("Ajouter une unité de mesure")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/measure_units_template.xlsx"
      downloadHandler={downloadMeasureUnits}
    >
      <MeasureUnitsTable
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

export default MeasureUnitsTab;
