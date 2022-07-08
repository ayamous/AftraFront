import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTCTariffsRelation = async ({
  techBarrierRefId,
  tariffBookRefs
}) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/tarifBookRefs/${tariffBookRefs}`
      }
    }
  };
  return post(`/techBarrierRefs/${techBarrierRefId}/tarifBookRefs`, payload);
};

export default createTCTariffsRelation;
