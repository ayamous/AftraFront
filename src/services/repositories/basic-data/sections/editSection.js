import { put } from "../../../http.service";

const editSection = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/sectionRefs/${id}`, payload);
};

export default editSection;
