import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editCity = (id, { reference, countryRefId }) => {
  const payload = {};

  if (reference) payload.reference = reference;
  if (countryRefId) payload.countryRef = `${gateway}/countryRefs/${countryRefId}`;

  return put(`/cityRefs/${id}`, payload);
};

export default editCity;
