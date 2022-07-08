import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import { Trans, useTranslation } from "react-i18next";

import DeclarationTypesTab from "./declaration-types";
import CustomsTab from "./customs";
import DocumentsSetUpTab from "./document-setup";
import OriginCountryTab from "./origin-country";
import ExportCountryTab from "./export-country";
import ProceduresTab from "./procedures";
import SubProceduresTab from "./sub-procedures";
import SafetyTab from "./safety";
import { getPassedQueryTab } from "../../../../../utils";
import tabKeys from "./tabKeys";
import styles from "./styles.module.scss";
import "./overrides.scss";

const { TabPane } = Tabs;

function DocumentsAsideMenu() {
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
              alt={t("Document setup")}
            />
            <Trans>Document setup</Trans>
          </span>
        )}
        key={tabKeys[0]}
      >
        <DocumentsSetUpTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/measure_units.png"
              alt={t("Pays d’origine")}
            />
            <Trans>Pays d’origine</Trans>
          </span>
        )}
        key={tabKeys[1]}
      >
        <OriginCountryTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/currencies.png"
              alt={t("Pays destination")}
            />
            <Trans>Pays destination</Trans>
          </span>
        )}
        key={tabKeys[2]}
      >
        <ExportCountryTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/packaging.png"
              alt={t("Régime dounaier")}
            />
            <Trans>Régime dounaier</Trans>
          </span>
        )}
        key={tabKeys[3]}
      >
        <CustomsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/customs.png"
              alt={t("Types de déclaration")}
            />
            <Trans>Types de déclaration</Trans>
          </span>
        )}
        key={tabKeys[4]}
      >
        <DeclarationTypesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Procédures")}
            />
            <Trans>Procédures</Trans>
          </span>
        )}
        key={tabKeys[5]}
      >
        <ProceduresTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/declaration_types.png"
              alt={t("Sous procédures")}
            />
            <Trans>Sous-procédures</Trans>
          </span>
        )}
        key={tabKeys[6]}
      >
        <SubProceduresTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/declaration_types.png"
              alt={t("Coffre-fort numérique")}
            />
            <Trans>Coffre-fort numérique</Trans>
          </span>
        )}
        key={tabKeys[7]}
      >
        <SafetyTab />
      </TabPane>
    </Tabs>
  );
}

export default DocumentsAsideMenu;
