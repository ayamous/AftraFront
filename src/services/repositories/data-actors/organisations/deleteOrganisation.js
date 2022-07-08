import { remove } from "../../../http.service";

const deleteOrganisation = async (id) => remove(`/organizations/${id}`);

export default deleteOrganisation;
