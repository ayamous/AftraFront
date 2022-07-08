import { upload } from "../../../http.service";

const addCountryGroupRelationsByFile = async (formData) => upload("/countryGroupRefs/import", formData);

export default addCountryGroupRelationsByFile;
