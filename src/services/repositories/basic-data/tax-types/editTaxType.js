import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editTaxType = (id, { code, countryRefId }) => {
  const payload = {
    code
  };
  if (countryRefId) payload.countryRef = `${gateway}/countryRefs/${countryRefId}`;

  return put(`/taxRefs/${id}`, payload);
};

export default editTaxType;
