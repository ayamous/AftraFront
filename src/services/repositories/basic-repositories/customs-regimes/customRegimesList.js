import { get } from "../../../http.service";
import Params from "../../../shared";

const customRegimesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/customsRegimRefs", params);
  return {
    content:
      (response && response._embedded && response._embedded.customsRegimRefs)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default customRegimesList;
