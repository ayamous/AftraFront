import { upload } from "../../../http.service";

const addSectionsByFile = async (formData) => upload("/sectionRefs/import", formData);

export default addSectionsByFile;
