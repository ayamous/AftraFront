import { remove } from "../http.service";

const deleteDocument = async (id) => remove(`/eSafeDocuments/${id}`);

export default deleteDocument;
