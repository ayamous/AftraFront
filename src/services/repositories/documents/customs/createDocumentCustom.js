import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createDocumentCustom = async ({ documentSetupId, customsRegimId }) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/customsregimrefs/${customsRegimId}`
      }
    }
  };
  return post(
    `/documentSetupRefs/${documentSetupId}/customsRegimRefs`,
    payload
  );
};

export default createDocumentCustom;
