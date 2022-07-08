import Params from "../shared";
import { get } from "../http.service";

const documentsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/eSafeDocuments", params);
  return {
    content: response && response._embedded ? response._embedded.eSafeDocuments : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default documentsList;
