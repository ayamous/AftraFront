import { remove } from "../../../http.service";

const deleteCountriesGroup = async (id) => remove(`/countryGroupRefs/${id}`);

export default deleteCountriesGroup;
