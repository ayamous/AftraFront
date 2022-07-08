import Params from "../../../shared";
import { get } from "../../../http.service";

const sectionsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/sectionRefs", params);
  return {
    content: response && response._embedded ? response._embedded.sectionRefs : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default sectionsList;
