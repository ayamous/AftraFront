import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createMSP = async ({
  code,
  documentId,
  countryId
}) => {
  const payload = {
    code,
    documentSetupRef: `${gateway}/documentSetupRefs/${documentId}`,
    countryRef: `${gateway}/countryRefs/${countryId}`
  };

  return post("/sanitaryPhytosanitaryMeasuresRefs", payload);
};

export default createMSP;
