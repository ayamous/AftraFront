import { upload } from "../../../http.service";

const addContactsByFile = async (formData) => upload("/personalContacts/import", formData);

export default addContactsByFile;
