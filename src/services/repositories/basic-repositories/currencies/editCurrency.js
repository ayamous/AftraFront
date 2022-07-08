import { put } from "../../../http.service";

const editCurrency = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/refCurrencies/${id}`, payload);
};

export default editCurrency;
