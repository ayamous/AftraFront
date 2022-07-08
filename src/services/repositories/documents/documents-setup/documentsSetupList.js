import { get } from "../../../http.service";
import Params from "../../../shared";

const documentsSetupList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/documentSetupRefs", params);
  return {
    content:
      response && response._embedded
        ? response._embedded.documentSetupRefs
        : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default documentsSetupList;
