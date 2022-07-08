import { remove } from "../../../http.service";

const deleteCountryGroupRelation = async ({
  countryGroupRefId,
  countryRefId
}) => remove(`/countryGroupRefs/${countryGroupRefId}/countryRefs/${countryRefId}`);

export default deleteCountryGroupRelation;
