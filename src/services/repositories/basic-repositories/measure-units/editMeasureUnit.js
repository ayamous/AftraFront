import { put } from "../../../http.service";

const editMeasureUnit = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/unitRefs/${id}`, payload);
};

export default editMeasureUnit;
