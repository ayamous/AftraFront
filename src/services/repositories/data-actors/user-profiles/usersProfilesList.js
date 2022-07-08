import { get } from "../../../http.service";
import Params from "../../../shared";

const usersProfilesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/profils", params);
  return {
    content: response && response._embedded ? response._embedded.profils : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default usersProfilesList;
