import { upload } from "../../../http.service";

const addDocumentsSetupByFile = async (formData) => upload("/documentSetupRefs/import", formData);

export default addDocumentsSetupByFile;
