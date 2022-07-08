import { post } from "../../../http.service";

const createCustomRegime = async ({ code, regimType }) => {
  const payload = {
    code,
    regimType
  };
  return post("/customsRegimRefs", payload);
};

export default createCustomRegime;
