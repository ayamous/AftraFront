import { upload } from "../../../http.service";

const addPackagingByFile = async (formData) => upload("/refPackagings/import", formData);

export default addPackagingByFile;
