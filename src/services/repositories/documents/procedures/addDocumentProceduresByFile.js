import { upload } from "../../../http.service";

const addDocumentProceduresByFile = async (formData) => upload("/documentSetupNationalProcedure/import", formData);

export default addDocumentProceduresByFile;
