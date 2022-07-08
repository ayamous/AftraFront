import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createContactUserRelation = async ({ contactId, userId }) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/userAccounts/${userId}`
      }
    }
  };
  return post(`/personalContacts/${contactId}/userAccounts`, payload);
};

export default createContactUserRelation;
