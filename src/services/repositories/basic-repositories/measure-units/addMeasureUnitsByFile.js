import { upload } from "../../../http.service";

const addMeasureUnitsByFile = async (formData) => upload("/unitRefs/import", formData);

export default addMeasureUnitsByFile;
