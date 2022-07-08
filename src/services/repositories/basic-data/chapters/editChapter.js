import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editChapter = (id, { code, sectionId }) => {
  const payload = {
    code
  };
  if (sectionId) payload.sectionRef = `${gateway}/sectionRefs/${sectionId}`;

  return put(`/chapterRefs/${id}`, payload);
};

export default editChapter;
