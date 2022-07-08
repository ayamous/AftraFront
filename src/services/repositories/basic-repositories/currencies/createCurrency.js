import { post } from "../../../http.service";

const createCurrency = async ({ code }) => {
  const payload = {
    code
  };
  return post("/refCurrencies", payload);
};

export default createCurrency;
