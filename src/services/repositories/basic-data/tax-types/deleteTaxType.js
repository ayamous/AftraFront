import { remove } from "../../../http.service";

const deleteTaxType = async (id) => remove(`/taxRefs/${id}`);

export default deleteTaxType;
