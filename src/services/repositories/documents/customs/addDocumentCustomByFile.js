import { upload } from "../../../http.service";

const addDocumentCustomByFile = async (formData) => upload("/documentCustomsRegimJoin/import", formData);

export default addDocumentCustomByFile;
