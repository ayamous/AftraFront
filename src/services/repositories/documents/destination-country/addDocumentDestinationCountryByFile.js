import { upload } from "../../../http.service";

const addDocumentDestinationCountryByFile = async (formData) => upload("/documentSetupRefsCountry/import/DESTINATION", formData);

export default addDocumentDestinationCountryByFile;
