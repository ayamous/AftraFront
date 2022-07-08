import { upload } from "../http.service";

const addDocumentByFile = async (formData) => upload("/eSafeDocuments/upload", formData);

export default addDocumentByFile;
