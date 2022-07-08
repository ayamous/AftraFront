import { upload } from "../../../http.service";

const addTransportationTypeByFile = async (formData) => upload("/refTransportationTypes/import", formData);

export default addTransportationTypeByFile;
