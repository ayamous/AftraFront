import { post } from "../../../http.service";

const createCountriesGroup = async ({ code, reference }) => {
  const payload = {
    code,
    reference
  };
  return post("/countryGroupRefs", payload);
};

export default createCountriesGroup;
