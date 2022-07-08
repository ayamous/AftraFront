import { upload } from "../../../http.service";

const addTariffHeadingsByFile = async (formData) => upload("/tarifBookRefs/import", formData);

export default addTariffHeadingsByFile;
