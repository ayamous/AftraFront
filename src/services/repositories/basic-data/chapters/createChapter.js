import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createChapter = async ({ code, sectionId }) => {
  const payload = {
    code,
    sectionRef: `${gateway}/sectionRefs/${sectionId}`
  };

  return post("/chapterRefs", payload);
};

export default createChapter;
