import { remove } from "../../../http.service";

const deleteOrgCategory = async (id) => remove(`/categoryRefs/${id}`);

export default deleteOrgCategory;
