import { upload } from "../../../http.service";

const addPortsFile = async (formData) => upload("/portRefs/import", formData);

export default addPortsFile;
