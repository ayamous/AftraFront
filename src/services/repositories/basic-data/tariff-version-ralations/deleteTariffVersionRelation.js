import { remove } from "../../../http.service";

const deleteLanguage = async (id) => remove(`/versionTariffBookRefs/${id}`);

export default deleteLanguage;
