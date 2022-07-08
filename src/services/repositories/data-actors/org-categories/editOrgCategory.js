import { put } from "../../../http.service";

const editOrgCategory = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/categoryRefs/${id}`, payload);
};

export default editOrgCategory;
