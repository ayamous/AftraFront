import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddDeclarationType from "./addDeclarationType";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  declarationTypesList,
  declarationTypesListId,
  downloadDeclarationTypes,
  addDeclarationTypesByFile
} from "../../../../../../services/repositories/basic-repositories/declaration-types";
import DeclarationTypesTable from "./declarationTypesTable";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function DeclarationTypesTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [declarationTypesListId, currentPage],
    () => declarationTypesList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Types de déclaration");

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
    addDeclarationTypesByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddDeclarationType}
      addLabel={t("Ajouter un type de déclaration")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/declaration_types_template.xlsx"
      downloadHandler={downloadDeclarationTypes}
    >
      <DeclarationTypesTable
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

export default DeclarationTypesTab;
