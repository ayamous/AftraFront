import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import LanguagesTab from "./languages";
import MeasureUnitsTab from "./measure-units";
import ProductPackagingTab from "./product-packaging";
import CurrenciesTab from "./currencies";
import TransportationTypesTab from "./transportation-types";
import DeclarationTypesTab from "./declaration-types";
import CustomsTab from "./customs";

const tabKeys = ["languages", "measure-units", "currencies", "product-packaging", "customs", "transportation-types", "declaration-types"];
const defaultTabPane = "languages";

const getPassedTab = (queryString) => {
  if (!queryString) return defaultTabPane;
  const split = queryString.split("&")[0].split("?tab=");
  if (split.length !== 2) return defaultTabPane;
  if (tabKeys.includes(split[1])) return split[1];
  return defaultTabPane;
};

const { TabPane } = Tabs;
function BasicRefAsideMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const { search } = location;
  const defaultActiveKey = getPassedTab(search);
  console.log("tab===>", defaultActiveKey);

  const setUrlTab = (activeKey) => {
    history.push({
      search: `?tab=${activeKey}`
    });
  };

  useEffect(() => {
    setUrlTab(defaultActiveKey);
  }, []);

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      tabPosition="left"
      className={styles.asideMenu}
      onChange={setUrlTab}
    >
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/languages.png"
              alt={t("Langues")}
            />
            {t("Langues")}
          </span>
        )}
        key="languages"
      >
        <LanguagesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/measure_units.png"
              alt={t("Unités de mesure")}
            />
            {t("Unités de mesure")}
          </span>
        )}
        key="measure-units"
      >
        <MeasureUnitsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/currencies.png"
              alt={t("Devises")}
            />
            {t("Devises")}
          </span>
        )}
        key="currencies"
      >
        <CurrenciesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/packaging.png"
              alt={t("Packaging Produit")}
            />
            {t("Packaging Produit")}
          </span>
        )}
        key="product-packaging"
      >
        <ProductPackagingTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/customs.png"
              alt={t("Régimes douaniers")}
            />
            {t("Régimes douaniers")}
          </span>
        )}
        key="customs"
      >
        <CustomsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/transportation_types.png"
              alt={t("Types Transportation")}
            />
            {t("Types Transportation")}
          </span>
        )}
        key="transportation-types"
      >
        <TransportationTypesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-referances/declaration_types.png"
              alt={t("Types de Déclaration")}
            />
            {t("Types de Déclaration")}
          </span>
        )}
        key="declaration-types"
      >
        <DeclarationTypesTab />
      </TabPane>
    </Tabs>
  );
}

export default BasicRefAsideMenu;
