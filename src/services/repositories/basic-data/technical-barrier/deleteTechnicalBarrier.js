import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/techBarrierRefs/${id}`);

export default deleteLanguage;
