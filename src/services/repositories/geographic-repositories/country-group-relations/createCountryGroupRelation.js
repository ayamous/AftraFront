import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createCountryGroupRelation = async ({
  countryRefId,
  countryGroupRefId
}) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/countryRefs/${countryRefId}`
      }
    }
  };
  return post(`/countryGroupRefs/${countryGroupRefId}/countryRefs`, payload);
};

export default createCountryGroupRelation;
