import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/sectionRefs/${id}`);

export default deleteLanguage;
