import { upload } from "../../../http.service";

const addUserProfilesFile = async (formData) => upload("/profils/import", formData);

export default addUserProfilesFile;
