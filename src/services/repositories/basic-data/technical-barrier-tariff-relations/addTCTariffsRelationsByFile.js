import { upload } from "../../../http.service";

const addTCTariffsRelationsByFile = async (formData) => upload("/techBarrierTariffBookRefJoin/import", formData);

export default addTCTariffsRelationsByFile;
