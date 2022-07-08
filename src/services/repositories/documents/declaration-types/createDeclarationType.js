import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createDeclarationType = async ({
  documentSetupRefId,
  declarationTypeRefId
}) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/declarationTypeRefs/${declarationTypeRefId}`
      }
    }
  };
  return post(
    `/documentSetupRefs/${documentSetupRefId}/declarationTypeRefs`,
    payload
  );
};

export default createDeclarationType;
