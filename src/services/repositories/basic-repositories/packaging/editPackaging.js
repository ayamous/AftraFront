import { put } from "../../../http.service";

const editPackaging = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/refPackagings/${id}`, payload);
};

export default editPackaging;
