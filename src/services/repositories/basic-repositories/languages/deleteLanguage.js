import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/langs/${id}`);

export default deleteLanguage;
