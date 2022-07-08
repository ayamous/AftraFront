import { upload } from "../http.service";

const uploadFile = async (formData) => upload("/eSafeDocuments/upload", formData);

export default uploadFile;
