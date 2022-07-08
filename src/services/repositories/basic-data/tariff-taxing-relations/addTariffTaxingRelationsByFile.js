import { upload } from "../../../http.service";

const addTariffTaxingRelationsByFile = async (formData) => upload("/tarifBookTaxation/import", formData);

export default addTariffTaxingRelationsByFile;
