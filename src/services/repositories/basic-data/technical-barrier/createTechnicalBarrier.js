import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTechnicalBarrier = async ({
  code,
  documentId,
  countryId
}) => {
  const payload = {
    code,
    documentSetupRef: `${gateway}/documentSetupRefs/${documentId}`,
    countryRef: `${gateway}/countryRefs/${countryId}`
  };

  return post("/techBarrierRefs", payload);
};

export default createTechnicalBarrier;
