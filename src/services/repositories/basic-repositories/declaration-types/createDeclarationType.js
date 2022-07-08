import { post } from "../../../http.service";

const createDeclarationType = async ({ code }) => {
  const payload = {
    code
  };

  return post("/declarationTypeRefs", payload);
};

export default createDeclarationType;
