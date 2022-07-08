import { upload } from "../../../http.service";

const addCurrenciesByFile = async (formData) => upload("/refCurrencies/import", formData);

export default addCurrenciesByFile;
