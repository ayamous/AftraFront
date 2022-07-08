import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editOrgContact = (
  id,
  {
    reference,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    address,
    email,
    faxNumber,
    contactType,
    occupation,
    organizationRefId
  }
) => {
  const payload = {
    reference,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    adress: address,
    email,
    faxNumber,
    contactType,
    occupation
  };
  if (organizationRefId) payload.organization = `${gateway}/organizations/${organizationRefId}`;
  return put(`/personalContacts/${id}`, payload);
};

export default editOrgContact;
