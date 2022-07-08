import { post } from "../../../http.service";

const createMeasureUnit = async ({ code }) => {
  const payload = {
    code
  };
  return post("/unitRefs", payload);
};

export default createMeasureUnit;
