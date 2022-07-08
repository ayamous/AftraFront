import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createDocumentProcedure = async ({ documentId, procedureId }) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/nationalProcedureRefs/${procedureId}`
      }
    }
  };
  return post(
    `/documentSetupRefs/${documentId}/nationalProcedureRefs`,
    payload
  );
};

export default createDocumentProcedure;
