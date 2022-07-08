import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/tarifBookRefs/${id}`);

export default deleteLanguage;
