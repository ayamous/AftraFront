import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createMSPtariffsRelation = async ({
  mspId,
  tarifBookRefs
}) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/tarifBookRefs/${tarifBookRefs}`
      }
    }
  };
  return post(`/sanitaryPhytosanitaryMeasuresRefs/${mspId}/tarifBookRefs`, payload);
};

export default createMSPtariffsRelation;
