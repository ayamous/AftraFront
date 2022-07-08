import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createContact = async ({
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
}) => {
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
    occupation,
    organization: `${gateway}/organizations/${organizationRefId}`
  };

  return post("/personalContacts", payload);
};

export default createContact;
