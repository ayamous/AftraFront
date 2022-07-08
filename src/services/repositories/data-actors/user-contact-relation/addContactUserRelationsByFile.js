import { upload } from "../../../http.service";

const addContactUserRelationsByFile = async (formData) => upload("/contactUserAccountJoin/import", formData);

export default addContactUserRelationsByFile;
