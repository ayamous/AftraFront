import { post } from "../../../http.service";

const createOrgCategory = async ({ code }) => {
  const payload = {
    code
  };

  return post("/categoryRefs", payload);
};

export default createOrgCategory;
