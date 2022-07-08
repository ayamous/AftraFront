import { upload } from "../../../http.service";

const addSubProceduresByFile = async (formData) => upload("/extendedProcedureRefs/import", formData);

export default addSubProceduresByFile;
