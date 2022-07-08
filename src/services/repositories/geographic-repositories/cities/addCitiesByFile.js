import { upload } from "../../../http.service";

const addCitiesByFile = async (formData) => upload("/cityRefs/import", formData);

export default addCitiesByFile;
