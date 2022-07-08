import { remove } from "../../../http.service";

const deleteTCTariffsRelation = async ({
  techBarrierRefId,
  tariffBookId
}) => remove(`/techBarrierRefs/${techBarrierRefId}/tarifBookRefs/${tariffBookId}`);

export default deleteTCTariffsRelation;
