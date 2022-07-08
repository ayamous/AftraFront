import { remove } from "../../../http.service";

const deleteMSPCustomsRelation = async ({
  msptId, customsRegimId
}) => remove(`/sanitaryPhytosanitaryMeasuresRefs/${msptId}/customsRegimRefs/${customsRegimId}`);

export default deleteMSPCustomsRelation;
