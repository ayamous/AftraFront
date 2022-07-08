import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import { Trans, useTranslation } from "react-i18next";
import LanguagesTab from "./languages";
import MeasureUnitsTab from "./measure-units";
import ProductPackagingTab from "./product-packaging";
import CurrenciesTab from "./currencies";
import TransportationTypesTab from "./transportation-types";
import DeclarationTypesTab from "./declaration-types";
import CustomsTab from "./customs-regime";
import { getPassedQueryTab } from "../../../../../utils";
import tabKeys from "./tabKeys";
import styles from "./styles.module.scss";
import "./overrides.scss";

const { TabPane } = Tabs;

function BasicRefAsideMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const { search } = location;
  const defaultActiveKey = getPassedQueryTab(search, tabKeys);

  const setUrlTab = (activeKey) => {
    history.push({ search: `?tab=${activeKey}` });
  };

  useEffect(() => {
    history.replace({ search: `?tab=${defaultActiveKey}` });
  }, []);

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      tabPosition="left"
      onChange={setUrlTab}
    >
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/languages.png"
              alt={t("Langues")}
            />
            <Trans>Langues</Trans>
          </span>
        )}
        key={tabKeys[0]}
      >
        <LanguagesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/measure_units.png"
              alt={t("Unités de mesure")}
            />
            <Trans>Unités de mesure</Trans>
          </span>
        )}
        key={tabKeys[1]}
      >
        <MeasureUnitsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/currencies.png"
              alt={t("Devises")}
            />
            <Trans>Devises</Trans>
          </span>
        )}
        key={tabKeys[2]}
      >
        <CurrenciesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/packaging.png"
              alt={t("Packaging Produit")}
            />
            <Trans>Packaging Produit</Trans>
          </span>
        )}
        key={tabKeys[3]}
      >
        <ProductPackagingTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/customs.png"
              alt={t("Régimes douaniers")}
            />
            <Trans>Régimes douaniers</Trans>
          </span>
        )}
        key={tabKeys[4]}
      >
        <CustomsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Types Transportation")}
            />
            <Trans>Types Transportation</Trans>
          </span>
        )}
        key={tabKeys[5]}
      >
        <TransportationTypesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/declaration_types.png"
              alt={t("Types de Déclaration")}
            />
            <Trans>Types de Déclaration</Trans>
          </span>
        )}
        key={tabKeys[6]}
      >
        <DeclarationTypesTab />
      </TabPane>
    </Tabs>
  );
}

export default BasicRefAsideMenu;
