import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import { Trans, useTranslation } from "react-i18next";
import CountriesTab from "./countries";
import CitiesTab from "./cities";
import CountryGroupsTab from "./country-groups";
import CountryGroupRelationTab from "./country-group-relation";
import { getPassedQueryTab } from "../../../../../utils";
import tabKeys from "./tabKeys";
import styles from "./styles.module.scss";
import "./overrides.scss";

const { TabPane } = Tabs;

function GeographicRefAsideMenu() {
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
              alt={t("Pays")}
            />
            <Trans>Pays</Trans>
          </span>
        )}
        key={tabKeys[0]}
      >
        <CountriesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/measure_units.png"
              alt={t("Villes")}
            />
            <Trans>Villes</Trans>
          </span>
        )}
        key={tabKeys[1]}
      >
        <CitiesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/currencies.png"
              alt={t("Groupements des pays")}
            />
            <Trans>Groupements des pays</Trans>
          </span>
        )}
        key={tabKeys[2]}
      >
        <CountryGroupsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/packaging.png"
              alt={t("Relation Pays-Groupements")}
            />
            <Trans>Relation Pays-Groupements</Trans>
          </span>
        )}
        key={tabKeys[3]}
      >
        <CountryGroupRelationTab />
      </TabPane>
    </Tabs>
  );
}

export default GeographicRefAsideMenu;
