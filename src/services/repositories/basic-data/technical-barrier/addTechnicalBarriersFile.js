import { upload } from "../../../http.service";

const addTechnicalBarriersFile = async (formData) => upload("/techBarrierRefs/import", formData);

export default addTechnicalBarriersFile;
