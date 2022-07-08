import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createUser = async ({
  reference,
  login,
  password,
  temporalPwd,
  temporalPwdExpDate,
  status,
  profileId
}) => {
  const payload = {
    reference,
    login,
    password,
    temporalPwd,
    temporalPwdExpDate,
    status,
    profil: `${gateway}/profile/${profileId}`
  };

  return post("/userAccounts", payload);
};

export default createUser;
