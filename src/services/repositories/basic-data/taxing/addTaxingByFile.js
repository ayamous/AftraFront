import { upload } from "../../../http.service";

const addTaxingByFile = async (formData) => upload("/taxations/import", formData);

export default addTaxingByFile;
