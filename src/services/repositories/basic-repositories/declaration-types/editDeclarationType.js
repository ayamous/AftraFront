import { put } from "../../../http.service";

const editDeclarationType = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/declarationTypeRefs/${id}`, payload);
};

export default editDeclarationType;
