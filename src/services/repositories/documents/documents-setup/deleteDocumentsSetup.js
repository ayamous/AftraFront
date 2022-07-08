import { remove } from "../../../http.service";

const deleteDocumentsSetup = async (id) => remove(`/documentSetupRefs/${id}`);

export default deleteDocumentsSetup;
