import { upload } from "../../../http.service";

const addDocumentOriginCountryByFile = async (formData) => upload("/documentSetupRefsCountry/import/ORIGIN", formData);

export default addDocumentOriginCountryByFile;
