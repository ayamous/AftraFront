import { remove } from "../../../http.service";

const deleteCustomRegime = async (id) => remove(`/customsRegimRefs/${id}`);

export default deleteCustomRegime;
