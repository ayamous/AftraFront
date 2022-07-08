import Params from "../../../shared";
import { get } from "../../../http.service";

const tariffHeadingsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/tarifBookRefs/all", params);
  return {
    content: response && response._embedded ? response._embedded.tarifBookRefs : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default tariffHeadingsList;
