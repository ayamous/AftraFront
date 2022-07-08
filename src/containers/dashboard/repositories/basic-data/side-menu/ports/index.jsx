import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import AddPort from "./addPort";
import PortsTable from "./portsTable";
import TabFormController from "../../../../../../components/tab-form";
import repositoriesRoutes from "../../../../../../router/dashboard-routes/repositoriesRoutes";
import {
  addPortsFile,
  portsList,
  portsListId,
  downloadPorts
} from "../../../../../../services/repositories/basic-data/ports";
import { refetchFailure } from "../../../../../../utils/notify-user";
import { ItemsPerPage } from "../../../../../../configs/constants";

function PortsTab() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isLoading, isError, data, refetch
  } = useQuery(
    [portsListId, currentPage],
    () => portsList(currentPage, ItemsPerPage)
  );

  const content = data && data.content;
  const total = (data && data.total) || 0;

  const tabName = t("Ports");
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
    addPortsFile(formData)
      .then(() => refetch())
      .catch(() => refetchFailure(t));
  };

  return (
    <TabFormController
      tabName={tabName}
      items={items}
      AddRowComponent={AddPort}
      addLabel={t("Ajouter un port")}
      addFileHandler={addByFile}
      searchHandler={search}
      templateSrc="/resources/ports_template.xlsx"
      downloadHandler={downloadPorts}
    >
      <PortsTable
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

export default PortsTab;
