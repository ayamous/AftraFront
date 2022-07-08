import { put } from "../../../http.service";

const editProcedure = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/refCurrencies/${id}`, payload);
};

export default editProcedure;
