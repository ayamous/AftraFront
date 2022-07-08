import { post } from "../../../http.service";

const createSection = async ({ code }) => {
  const payload = {
    code,
  };

  return post("/sectionRefs", payload);
};

export default createSection;
