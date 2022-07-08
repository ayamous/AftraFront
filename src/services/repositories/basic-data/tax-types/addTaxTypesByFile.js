import { upload } from "../../../http.service";

const addTaxTypesByFile = async (formData) => upload("/taxRefs/import", formData);

export default addTaxTypesByFile;
