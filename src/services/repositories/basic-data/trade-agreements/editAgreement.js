import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editAgreement = (
  id,
  {
    code, title, description, documentId, GroupId, countryId
  }
) => {
  const payload = {
    code,
    title,
    description
  };
  if (documentId) payload.documentSetupRef = `${gateway}/documentSetupRefs/${documentId}`;
  if (GroupId) payload.countryGroupRef = `${gateway}/countryGroupRefs/${GroupId}`;
  if (countryId) payload.countryRef = `${gateway}/countryRefs/${countryId}`;

  return put(`/agreements/${id}`, payload);
};

export default editAgreement;
