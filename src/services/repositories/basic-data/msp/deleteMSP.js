import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/sanitaryPhytosanitaryMeasuresRefs/${id}`);

export default deleteLanguage;
