import { remove } from "../../../http.service";

const deleteUser = async (id) => remove(`/userAccounts/${id}`);

export default deleteUser;
