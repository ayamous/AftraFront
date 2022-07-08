import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import TabFormController from "../../../../../../components/tab-form";
import AddCurrency from "./addCurrency";
import CurrenciesTable from "./currenciesTable";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  currenciesList,
  currenciesListId,
  addCurrenciesByFile,
  downloadCurrencies
} from "../../../../../../services/repositories/basic-repositories/currencies";
import refetchFailure from "../../../../../../utils/notify-user/refetchFailure";
import { ItemsPerPage } from "../../../../../../configs/constants";

function CurrenciesTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [currenciesListId, currentPage],
    () => currenciesList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Devises");
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
    addCurrenciesByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddCurrency}
      addLabel={t("Ajouter une devise")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/currencies_template.xlsx"
      downloadHandler={downloadCurrencies}
    >
      <CurrenciesTable
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

export default CurrenciesTab;
