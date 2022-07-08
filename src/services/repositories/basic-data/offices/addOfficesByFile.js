import { upload } from "../../../http.service";

const addOfficesByFile = async (formData) => upload("/customsOfficeRefs/import", formData);

export default addOfficesByFile;
