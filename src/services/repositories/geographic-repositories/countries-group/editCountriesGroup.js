import { put } from "../../../http.service";

const editCountriesGroup = (id, { code, reference }) => {
  const payload = {
    code,
    reference
  };
  return put(`/countryGroupRefs/${id}`, payload);
};

export default editCountriesGroup;
