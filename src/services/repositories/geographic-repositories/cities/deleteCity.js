import { remove } from "../../../http.service";

const deleteCity = async (id) => remove(`/cityRefs/${id}`);

export default deleteCity;
