import { upload } from "../../../http.service";

const addUsersFile = async (formData) => upload("/userAccounts/import", formData);

export default addUsersFile;
