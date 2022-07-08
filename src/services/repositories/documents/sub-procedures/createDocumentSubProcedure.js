import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createDocumentSubProcedure = async ({ documentId, subProcedureId }) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/extendedProcedureRefs/${subProcedureId}`
      }
    }
  };
  return post(
    `/documentSetupRefs/${documentId}/extendedProcedureRefs`,
    payload
  );
};

export default createDocumentSubProcedure;
