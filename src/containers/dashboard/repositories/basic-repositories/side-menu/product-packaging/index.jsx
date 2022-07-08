import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import ProductPackagingTable from "./productPackagingTable";
import AddPackagingProduct from "./addPackagingProduct";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  packagingList,
  packagingListId,
  addPackagingByFile,
  downloadPackaging
} from "../../../../../../services/repositories/basic-repositories/packaging";
import { refetchFailure } from "../../../../../../utils";
import { ItemsPerPage } from "../../../../../../configs/constants";

function ProductPackagingTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [packagingListId, currentPage],
    () => packagingList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Packaging Produits");
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
      name: t("Packaging Produits")
    }
  ];

  const search = () => {};

  const addByFile = async (formData) => {
    addPackagingByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddPackagingProduct}
      addLabel={t("Ajouter un packaging produit")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/packaging_products_template.xlsx"
      downloadHandler={downloadPackaging}
    >
      <ProductPackagingTable
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

export default ProductPackagingTab;
