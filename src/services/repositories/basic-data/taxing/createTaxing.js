import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTaxing = async ({
  reference,
  rate,
  value,
  countryRefId,
  customRegimeRefId,
  unitRefId,
  taxRefId
}) => {
  const payload = {
    reference,
    rate,
    value,
    countryRef: `${gateway}/countryRefs/${countryRefId}`,
    customsRegimRef: `${gateway}/customsRegimRefs/${customRegimeRefId}`,
    unitRef: `${gateway}/unitRefs/${unitRefId}`,
    taxRefs: `${gateway}/taxRefs/${taxRefId}`,
  };

  return post("/taxations", payload);
};

export default createTaxing;
