import { upload } from "../../../http.service";

const addDocumentSubProceduresByFile = async (formData) => upload("/documentSetupExtendedProcedure/import", formData);

export default addDocumentSubProceduresByFile;
