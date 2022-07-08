import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editTaxing = (
  id,
  {
    reference,
    rate,
    value,
    countryRefId,
    customRegimeRefId,
    unitRefId,
    taxRefId
  }
) => {
  const payload = {
    reference,
    rate,
    value
  };
  if (countryRefId) payload.countryRef = `${gateway}/countryRefs/${countryRefId}`;
  if (customRegimeRefId) payload.customsRegimRef = `${gateway}/customsRegimRefs/${customRegimeRefId}`;
  if (unitRefId) payload.unitRef = `${gateway}/unitRefs/${unitRefId}`;
  if (taxRefId) payload.taxRefs = `${gateway}/taxRefs/${taxRefId}`;

  return put(`/taxations/${id}`, payload);
};

export default editTaxing;
