import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import CustomsRegimesTable from "./customsRegimesTable";
import AddCustomRegime from "./addCustomRegime";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addCustomRegime,
  customRegimesList,
  customRegimeListId,
  downloadCustomRegime
} from "../../../../../../services/repositories/basic-repositories/customs-regimes";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function CustomsTab() {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [customRegimeListId, currentPage],
    () => customRegimesList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Régimes douaniers");

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
    addCustomRegime(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddCustomRegime}
      addLabel={t("Ajouter un régime dounaier")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/customs_regimes_template.xlsx"
      downloadHandler={downloadCustomRegime}
    >
      <CustomsRegimesTable
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

export default CustomsTab;
