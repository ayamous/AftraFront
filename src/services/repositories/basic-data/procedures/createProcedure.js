import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createProcedure = async ({ code, countryRefId, customsRegimRefId }) => {
  const payload = {
    code,
    countryRef: `${gateway}/countryRefs/${countryRefId}`,
    customsRegimRef: `${gateway}/customsRegimRefs/${customsRegimRefId}`
  };
  return post("/nationalProcedureRefs", payload);
};

export default createProcedure;
