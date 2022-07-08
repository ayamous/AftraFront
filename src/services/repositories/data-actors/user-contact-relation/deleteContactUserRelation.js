import { remove } from "../../../http.service";

const deleteContactUserRelation = async ({ contactId, userId }) => remove(`/personalContacts/${contactId}/userAccounts/${userId}`);

export default deleteContactUserRelation;
