import { remove } from "../../../http.service";

const deleteMSPtariffsRelation = async ({
  msptId, tarifBookId
}) => remove(`/sanitaryPhytosanitaryMeasuresRefs/${msptId}/tarifBookRefs/${tarifBookId}`);

export default deleteMSPtariffsRelation;
