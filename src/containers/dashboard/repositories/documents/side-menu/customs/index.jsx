import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import CustomsRegimesTable from "./customsRegimesTable";
import AddCustomRegime from "./addCustomRegime";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addDocumentCustomByFile,
  documentCustomList,
  documentCustomListId,
  downloadDocumentCustom
} from "../../../../../../services/repositories/documents/customs";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function CustomsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [documentCustomListId, currentPage],
    () => documentCustomList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Régime douanier");
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
    addDocumentCustomByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddCustomRegime}
      addLabel={t("Ajouter régime douanier")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/document_customs_regim_template.xlsx"
      downloadHandler={downloadDocumentCustom}
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
