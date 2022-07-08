import { upload } from "../../../http.service";

const addProceduresByFile = async (formData) => upload("/nationalProcedureRefs/import", formData);

export default addProceduresByFile;
