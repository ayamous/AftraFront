import { upload } from "../../../http.service";

const addTariffVersionsByFile = async (formData) => upload("/versionRefs/import", formData);

export default addTariffVersionsByFile;
