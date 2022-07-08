import { upload } from "../../../http.service";

const addMSPCustomsRelationsByFile = async (formData) => upload("/customsRegimeMSPJoin/import", formData);

export default addMSPCustomsRelationsByFile;
