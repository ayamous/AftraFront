import { put } from "../../../http.service";

const editSubProcedure = (id, { code }) => {
  const payload = {
    code
  };
  return put(`/extendedProcedureRefs/${id}`, payload);
};

export default editSubProcedure;
