import { upload } from "../../../http.service";

const addOrgCategoriesByFile = async (formData) => upload("/categoryRefs/import", formData);

export default addOrgCategoriesByFile;
