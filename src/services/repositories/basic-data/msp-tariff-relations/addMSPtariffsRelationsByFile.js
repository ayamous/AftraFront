import { upload } from "../../../http.service";

const addMSPtariffsRelationsByFile = async (formData) => upload("/mspTariffBookJoin/import", formData);

export default addMSPtariffsRelationsByFile;
