import { upload } from "../../../http.service";

const addDocumentDeclarationTypeByFile = async (formData) => upload("/documentSetupDeclarationType/import", formData);

export default addDocumentDeclarationTypeByFile;
