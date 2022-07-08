import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import DeclarationTypeTable from "./declarationTypeTable";
import AddDeclarationType from "./addDeclarationType";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentDeclarationTypeByFile,
  declarationTypesList,
  declarationTypesListId,
  downloadDeclarationTypes
} from "../../../../../../services/repositories/documents/declaration-types";
import { refetchFailure } from "../../../../../../utils/notify-user";
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
  const tabName = t("Type de déclaration");
  const items = [
    {
      name: t("Référentiels"),
      path: repositoriesRoutes[0].path
    },
    {
      name: t("Documents"),
      path: repositoriesRoutes[3].path
    },
    {
      name: tabName
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addDocumentDeclarationTypeByFile(formData)
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
      templateSrc="/resources/document_setup_declaration_type_template.xlsx"
      downloadHandler={downloadDeclarationTypes}
    >
      <DeclarationTypeTable
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
