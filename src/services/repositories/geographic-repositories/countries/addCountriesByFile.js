import { upload } from "../../../http.service";

const addCountriesByFile = async (formData) => upload("/countryRefs/import", formData);

export default addCountriesByFile;
