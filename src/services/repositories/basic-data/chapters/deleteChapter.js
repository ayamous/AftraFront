import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/chapterRefs/${id}`);

export default deleteLanguage;
