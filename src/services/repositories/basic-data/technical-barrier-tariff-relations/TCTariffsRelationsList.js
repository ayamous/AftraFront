import { get } from "../../../http.service";
import Params from "../../../shared";

const TCTariffsRelationsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/techBarrierTariffBookRefJoin/all", params);
  return {
    content: (response && response.content) || null,
    total: (response && response.totalElements) || 0
  };
};

export default TCTariffsRelationsList;
