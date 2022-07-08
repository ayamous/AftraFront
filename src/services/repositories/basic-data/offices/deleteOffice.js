import { remove } from "../../../http.service";

const deleteOffice = async (id) => remove(`/customsOfficeRefs/${id}`);

export default deleteOffice;
