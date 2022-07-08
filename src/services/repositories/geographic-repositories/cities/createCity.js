import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createCity = async ({ reference, countryRefId }) => {
  const creationPayload = {
    reference,
    countryRef: `${gateway}/countryRefs/${countryRefId}`
  };

  return post("/cityRefs", creationPayload);
};

export default createCity;
