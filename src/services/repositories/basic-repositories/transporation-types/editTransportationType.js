import { put } from "../../../http.service";

const editTransportationType = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/refTransportationTypes/${id}`, payload);
};

export default editTransportationType;
