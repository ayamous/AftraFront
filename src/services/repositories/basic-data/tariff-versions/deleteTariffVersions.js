import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/versionRefs/${id}`);

export default deleteLanguage;
