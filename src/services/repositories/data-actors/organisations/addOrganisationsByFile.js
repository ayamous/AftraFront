import { upload } from "../../../http.service";

const addOrganisationsByFile = async (formData) => upload("/organizations/import", formData);

export default addOrganisationsByFile;
