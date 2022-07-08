import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTaxType = async ({ code, countryRefId }) => {
  const payload = {
    code,
    countryRef: `${gateway}/countryRefs/${countryRefId}`
  };

  return post("/taxRefs", payload);
};

export default createTaxType;
