import { upload } from "../../../http.service";

const addDeclarationTypesByFile = async (formData) => upload("/declarationTypeRefs/import", formData);

export default addDeclarationTypesByFile;
