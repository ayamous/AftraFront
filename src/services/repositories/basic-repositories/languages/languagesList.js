import Params from "../../../shared";
import { get } from "../../../http.service";

const languagesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/langs", params);
  return {
    content: response && response._embedded ? response._embedded.langs : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default languagesList;
