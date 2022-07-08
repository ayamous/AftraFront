import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTariffRelation = async ({
  tariffBookRefId,
  versionRefId,
  countryRefId
}) => {
  const payload = {
    tarifBookRef: `${gateway}/tarifBookRefs/${tariffBookRefId}`,
    versionRef: `${gateway}/versionRefs/${versionRefId}`,
    countryRef: `${gateway}/countryRefs/${countryRefId}`,
  };

  return post("/versionRefs", payload);
};

export default createTariffRelation;
