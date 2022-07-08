import { put } from "../../../http.service";

const editCustomRegime = (id, { code, regimType }) => {
  const payload = {
    code,
    regimType
  };
  return put(`/customsRegimRefs/${id}`, payload);
};

export default editCustomRegime;
