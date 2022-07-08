import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createAgreement = async ({
  code,
  title,
  description,
  documentId,
  GroupId,
  countryId
}) => {
  const payload = {
    code,
    title,
    description,
    documentSetupRef: `${gateway}/documentSetupRefs/${documentId}`,
    countryGroupRef: `${gateway}/countryGroupRefs/${GroupId}`,
    countryRef: `${gateway}/countryRefs/${countryId}`
  };

  return post("/agreements", payload);
};

export default createAgreement;
