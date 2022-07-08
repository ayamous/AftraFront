import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createPort = async ({
  code,
  countryId
}) => {
  const payload = {
    code,
    countryRef: `${gateway}/countryRefs/${countryId}`
  };
  return post("/portRefs", payload);
};

export default createPort;
