import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTariffTaxingRelation = async ({ taxingRefId, tariffRefId }) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/taxations/${taxingRefId}`
      }
    }
  };
  return post(`/tarifBookRefs/${tariffRefId}/taxations`, payload);
};

export default createTariffTaxingRelation;
