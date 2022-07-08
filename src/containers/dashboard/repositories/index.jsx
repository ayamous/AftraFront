import React from "react";
import { useTranslation } from "react-i18next";
import repositoriesRoutes from "../../../router/dashboard-routes/repositoriesRoutes";
import MenuUnion from "../../../components/menu-union";

function Referential() {
  const { t } = useTranslation();
  const items = {
    col1: [
      { label: t("Référentiels de base"), to: repositoriesRoutes[1].path },
      { label: t("Documents"), to: repositoriesRoutes[3].path },
      { label: t("Data de base"), to: repositoriesRoutes[5].path }
    ],
    col2: [
      {
        label: t("Référentiels géographiques"),
        to: repositoriesRoutes[2].path
      },
      {
        label: t("Data acteurs et accès utilisateurs"),
        to: repositoriesRoutes[4].path
      },
      {
        label: t("Internationalisation des tables de références"),
        to: repositoriesRoutes[6].path
      }
    ]
  };
  return <MenuUnion items={items} />;
}

export default Referential;
