import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/agreements/${id}`);

export default deleteLanguage;
