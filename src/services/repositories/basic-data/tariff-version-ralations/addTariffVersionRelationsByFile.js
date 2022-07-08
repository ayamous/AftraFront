import { upload } from "../../../http.service";

const addTariffVersionRelationsByFile = async (formData) => upload("/versionTariffBookRefs/import", formData);

export default addTariffVersionRelationsByFile;
