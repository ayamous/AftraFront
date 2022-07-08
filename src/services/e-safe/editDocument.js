import { put } from "../http.service";

const editDocument = (id, { createdBy, createdOn, requestOrigin }) => {
  const payload = {
    createdBy,
    createdOn,
    requestOrigin
  };
  return put(`/eSafeDocuments/${id}`, payload);
};

export default editDocument;
