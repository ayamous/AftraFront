import { get } from "../../../http.service";
import Params from "../../../shared";

const orgCategoriesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/categoryRefs", params);
  return {
    content:
      response && response._embedded ? response._embedded.categoryRefs : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default orgCategoriesList;
