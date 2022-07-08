import { upload } from "../../../http.service";

const addAgreementsByFile = async (formData) => upload("/agreements/import", formData);

export default addAgreementsByFile;
