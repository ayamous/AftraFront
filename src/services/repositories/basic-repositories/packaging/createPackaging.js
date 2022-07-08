import { post } from "../../../http.service";

const createPackaging = async ({ code }) => {
  const payload = {
    code
  };
  return post("/refPackagings", payload);
};

export default createPackaging;
