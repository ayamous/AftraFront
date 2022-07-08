import { remove } from "../../../http.service";

const deleteTaxing = async (id) => remove(`/taxations/${id}`);

export default deleteTaxing;
