import { remove } from "../../../http.service";

const deleteTariffTaxingRelation = async ({
  tarifBookId, taxationId
}) => remove(`/tarifBookRefs/${tarifBookId}/taxation/${taxationId}`);

export default deleteTariffTaxingRelation;
