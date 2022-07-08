import { upload } from "../../../http.service";

const addCustomRegime = async (formData) => upload("/customsRegimRefs/import", formData);

export default addCustomRegime;
