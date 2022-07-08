import { post } from "../../../http.service";

const createCountry = async ({ codeIso, reference }) => {
  const payload = {
    codeIso,
    reference
  };
  return post("/countryRefs", payload);
};

export default createCountry;
