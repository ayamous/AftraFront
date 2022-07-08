import { put } from "../../../http.service";

const editDocumentsSetup = (id, {
  code, docName, techReference, scope
}) => {
  const payload = {
    code,
    docName,
    techReference,
    scope
  };

  return put(`/documentSetupRefs/${id}`, payload);
};

export default editDocumentsSetup;
