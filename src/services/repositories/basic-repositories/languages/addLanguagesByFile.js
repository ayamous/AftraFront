import { upload } from "../../../http.service";

const addLanguagesByFile = async (formData) => upload("/langs/import", formData);

export default addLanguagesByFile;
