import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddTaxType from "./addTaxType";
import TaxTypesTable from "./taxTypesTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addTaxTypesByFile,
  taxTypesList,
  taxTypesListId,
  downloadTaxTypes
} from "../../../../../../services/repositories/basic-data/tax-types";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function TaxTypeTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [taxTypesListId, currentPage],
    () => taxTypesList(currentPage, ItemsPerPage)
  );

  const total = (data && data.total) || 0;
  const content = data ? data.content : null;

  const tabName = t("Types de taxe");
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
      name: t("Types de taxe")
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addTaxTypesByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTaxType}
      addLabel={t("Ajouter un type de taxe")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/tax_types_template.xlsx"
      downloadHandler={downloadTaxTypes}
    >
      <TaxTypesTable
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

export default TaxTypeTab;
