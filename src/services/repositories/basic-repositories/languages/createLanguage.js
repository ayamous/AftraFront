import { post } from "../../../http.service";

const createLanguage = async ({ code, name, def }) => {
  const payload = {
    code,
    name,
    def
  };

  return post("/langs", payload);
};

export default createLanguage;
