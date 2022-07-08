import { put } from "../../../http.service";

const editCountry = (id, { codeIso, reference }) => {
  const payload = {
    codeIso,
    reference
  };
  return put(`/countryRefs/${id}`, payload);
};

export default editCountry;
