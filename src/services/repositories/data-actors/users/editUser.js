import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editUser = (
  id,
  {
    reference,
    login,
    password,
    temporalPwd,
    temporalPwdExpDate,
    status,
    profileId
  }
) => {
  const payload = {
    reference,
    login,
    password,
    temporalPwd,
    temporalPwdExpDate,
    status
  };
  if (profileId) payload.profil = `${gateway}/profile/${profileId}`;

  return put(`/userAccounts/${id}`, payload);
};

export default editUser;
