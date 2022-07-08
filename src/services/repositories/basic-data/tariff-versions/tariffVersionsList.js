import Params from "../../../shared";
import { get } from "../../../http.service";

const tariffVersionsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/versionRefs", params);
  return {
    content: response && response._embedded ? response._embedded.versionRefs : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default tariffVersionsList;
