import { upload } from "../../../http.service";

const addMSPsByFile = async (formData) => upload("/sanitaryPhytosanitaryMeasuresRefs/import", formData);

export default addMSPsByFile;
