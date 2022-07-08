import { remove } from "../../../http.service";

const deleteCountry = async (id) => remove(`/countryRefs/${id}`);

export default deleteCountry;
