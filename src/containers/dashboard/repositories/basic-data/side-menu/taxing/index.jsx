import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddTaxing from "./addTaxing";
import TaxingTable from "./taxingTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTaxingByFile,
  taxingList,
  taxingListId,
  downloadTaxing
} from "../../../../../../services/repositories/basic-data/taxing";
import { ItemsPerPage } from "../../../../../../configs/constants";
import { refetchFailure } from "../../../../../../utils/notify-user";

function TaxingTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [taxingListId, currentPage],
    () => taxingList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Taxation");
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
    addTaxingByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTaxing}
      addLabel={t("Ajouter une taxation")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/taxing_template.xlsx"
      downloadHandler={downloadTaxing}
    >
      <TaxingTable
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

export default TaxingTab;
