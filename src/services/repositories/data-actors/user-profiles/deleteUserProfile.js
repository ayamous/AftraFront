import { remove } from "../../../http.service";

const deleteUserProfile = async (id) => remove(`/profils/${id}`);

export default deleteUserProfile;
