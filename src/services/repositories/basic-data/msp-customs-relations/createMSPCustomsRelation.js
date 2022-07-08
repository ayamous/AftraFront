import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createMSPCustomsRelation = async ({
  mspId,
  customId
}) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/customsRegimRefs/${customId}`
      }
    }
  };
  return post(`/sanitaryPhytosanitaryMeasuresRefs/${mspId}/customsRegimRefs`, payload);
};

export default createMSPCustomsRelation;
