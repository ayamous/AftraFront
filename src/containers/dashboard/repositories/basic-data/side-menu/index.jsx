import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Tabs } from "antd";
import { Trans, useTranslation } from "react-i18next";

import SectionsTab from "./sections";
import ChaptersTab from "./chapters";
import TariffHeadingTab from "./tariff-heading";
import TariffHeadingVersionsTab from "./tariff-heading-versions";
import TariffHeadingVersionRelation from "./tariff-heading-versions-relation";
import TaxTypeTab from "./tax-types";
import { getPassedQueryTab } from "../../../../../utils";
import TaxingTab from "./taxing";
import TariffTaxingRelationTab from "./tariff-taxing-relation";
import TradeAgreementsTab from "./trade-agreements";
import ProceduresTab from "./procedures";
import SubProceduresTab from "./sub-procedures";
import SanitaryMeasuresAndPhytosanitaryTab from "./msp";
import MSPTariffHeadingTab from "./msp-tariff-heading";
import MSPCustomsTab from "./msp-customs";
import TechnicalBarrierTab from "./technical-barrier";
import TechnicalBarrierTariffHeadingRelationTab from "./technical-barrier-tariff-heading-relations";
import CustomsOfficesTab from "./customs-offices";
import PortsTab from "./ports";

import tabKeys from "./tabKeys";
import styles from "./styles.module.scss";
import "./overrides.scss";

const { TabPane } = Tabs;

function BasicDataAsideMenu() {
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
              alt={t("Sections")}
            />
            <Trans>Sections</Trans>
          </span>
        )}
        key={tabKeys[0]}
      >
        <SectionsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/measure_units.png"
              alt={t("Chapitres")}
            />
            <Trans>Chapitres</Trans>
          </span>
        )}
        key={tabKeys[1]}
      >
        <ChaptersTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/currencies.png"
              alt={t("Positions tarifaires")}
            />
            <Trans>Positions tarifaires</Trans>
          </span>
        )}
        key={tabKeys[2]}
      >
        <TariffHeadingTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/packaging.png"
              alt={t("Versions des positions tarifaires")}
            />
            <Trans>Versions des positions tarifaires</Trans>
          </span>
        )}
        key={tabKeys[3]}
      >
        <TariffHeadingVersionsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/customs.png"
              alt={t("Relations versions - positions tarifaires")}
            />
            <Trans>Relations versions-positions tarifaires</Trans>
          </span>
        )}
        key={tabKeys[4]}
      >
        <TariffHeadingVersionRelation />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Types de taxe")}
            />
            <Trans>Types de taxe</Trans>
          </span>
        )}
        key={tabKeys[5]}
      >
        <TaxTypeTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Taxation")}
            />
            <Trans>Taxation</Trans>
          </span>
        )}
        key={tabKeys[6]}
      >
        <TaxingTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Relations positions tarifaires")}
            />
            <Trans>Relations positions tarifaires</Trans>
          </span>
        )}
        key={tabKeys[7]}
      >
        <TariffTaxingRelationTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Accords commerciaux")}
            />
            <Trans>Accords commerciaux</Trans>
          </span>
        )}
        key={tabKeys[8]}
      >
        <TradeAgreementsTab />
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
        key={tabKeys[9]}
      >
        <ProceduresTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Sous-procédures")}
            />
            <Trans>Sous-procédures</Trans>
          </span>
        )}
        key={tabKeys[10]}
      >
        <SubProceduresTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Mesures sanitaires et phytosanitaires")}
            />
            <Trans>MSP</Trans>
          </span>
        )}
        key={tabKeys[11]}
      >
        <SanitaryMeasuresAndPhytosanitaryTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("MSP Régime")}
            />
            <Trans>MSP Régime</Trans>
          </span>
        )}
        key={tabKeys[12]}
      >
        <MSPCustomsTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("MSP position tarifaire")}
            />
            <Trans>MSP Position tarifaire</Trans>
          </span>
        )}
        key={tabKeys[13]}
      >
        <MSPTariffHeadingTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Barrière technique")}
            />
            <Trans>Barrière technique</Trans>
          </span>
        )}
        key={tabKeys[14]}
      >
        <TechnicalBarrierTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Relation barrière technique - position")}
            />
            <Trans>Relation barrière technique - position</Trans>
          </span>
        )}
        key={tabKeys[15]}
      >
        <TechnicalBarrierTariffHeadingRelationTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Bureaux douane")}
            />
            <Trans>Bureaux douane</Trans>
          </span>
        )}
        key={tabKeys[16]}
      >
        <CustomsOfficesTab />
      </TabPane>
      <TabPane
        tab={(
          <span>
            <img
              className={styles.icon}
              src="/icons/basic-references/transportation_types.png"
              alt={t("Ports")}
            />
            <Trans>Ports</Trans>
          </span>
        )}
        key={tabKeys[17]}
      >
        <PortsTab />
      </TabPane>
    </Tabs>
  );
}

export default BasicDataAsideMenu;
