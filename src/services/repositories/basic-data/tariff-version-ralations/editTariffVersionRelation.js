import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editTariffVersionRelation = (
  id,
  {
    versionRefId,
    countryRefId
  }
) => {
  const payload = {};
  if (versionRefId) payload.versionRef = `${gateway}/versionRefs/${versionRefId}`;
  if (countryRefId) payload.countryRef = `${gateway}/countryRefs/${versionRefId}`;

  return put(`/versionTariffBookRefs/${id}`, payload);
};

export default editTariffVersionRelation;
