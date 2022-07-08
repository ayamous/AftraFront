import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import { Trans, useTranslation } from "react-i18next";

import OrganizationsCategoriesTab from "./organizations-categories";
import OrganizationsTab from "./organizations";
import ContactsTab from "./contacts";
import UsersTab from "./users";
import UsersProfilesTab from "./user-profiles";
import ContactRelationsTab from "./contact-relations";
import { getPassedQueryTab } from "../../../../../utils";
import tabKeys from "./tabKeys";
import styles from "./styles.module.scss";
import "./overrides.scss";

const { TabPane } = Tabs;

function DataActorsAsideMenu() {
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
              alt={t("Organisations")}
            />
            <Trans>Organisations</Trans>
          </span>
        )}
        key={tabKeys[0]}
      >
        <OrganizationsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/measure_units.png"
              alt={t("Catégories organisations")}
            />
            <Trans>Catégories organisations</Trans>
          </span>
        )}
        key={tabKeys[1]}
      >
        <OrganizationsCategoriesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/currencies.png"
              alt={t("Contacts")}
            />
            <Trans>Contacts</Trans>
          </span>
        )}
        key={tabKeys[2]}
      >
        <ContactsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/packaging.png"
              alt={t("Utilisateurs")}
            />
            <Trans>Utilisateurs</Trans>
          </span>
        )}
        key={tabKeys[3]}
      >
        <UsersTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/customs.png"
              alt={t("Profils utilisateurs")}
            />
            <Trans>Profils utilisateurs</Trans>
          </span>
        )}
        key={tabKeys[4]}
      >
        <UsersProfilesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Relations chapters")}
            />
            <Trans>Relations contacts</Trans>
          </span>
        )}
        key={tabKeys[5]}
      >
        <ContactRelationsTab />
      </TabPane>
    </Tabs>
  );
}

export default DataActorsAsideMenu;
