import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editMSP = (id, { code, documentId, countryId }) => {
  const payload = {
    code
  };
  if (documentId) payload.documentSetupRef = `${gateway}/documentSetupRefs/${documentId}`;
  if (countryId) payload.countryRef = `${gateway}/countryRefs/${countryId}`;

  return put(`/sanitaryPhytosanitaryMeasuresRefs/${id}`, payload);
};

export default editMSP;
