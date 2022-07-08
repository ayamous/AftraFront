import { post } from "../../../http.service";

const createDocumentsSetup = async ({
  code,
  docName,
  techReference,
  scope
}) => {
  const creationPayload = {
    code,
    docName,
    techReference,
    scope
  };

  return post("/documentSetupRefs", creationPayload);
};

export default createDocumentsSetup;
