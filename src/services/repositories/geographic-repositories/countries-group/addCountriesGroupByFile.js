import { upload } from "../../../http.service";

const addCountriesGroupByFile = async (formData) => upload("/countryGroupRefs/import", formData);

export default addCountriesGroupByFile;
