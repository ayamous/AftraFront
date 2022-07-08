import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddTradeAgreement from "./addTradeAgreement";
import TradeAgreementsTable from "./tradeAgreementsTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addAgreementsByFile,
  agreementsList,
  agreementsListId,
  downloadAgreements
} from "../../../../../../services/repositories/basic-data/trade-agreements";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function TradeAgreementsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [agreementsListId, currentPage],
    () => agreementsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;
  const tabName = t("Accords commerciaux");
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
    addAgreementsByFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddTradeAgreement}
      addLabel={t("Ajouter un accord")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/agreements_template.xlsx"
      downloadHandler={downloadAgreements}
    >
      <TradeAgreementsTable
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

export default TradeAgreementsTab;
