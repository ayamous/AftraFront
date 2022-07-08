import { remove } from "../../../http.service";

const deleteContact = async (id) => remove(`/personalContacts/${id}`);

export default deleteContact;
