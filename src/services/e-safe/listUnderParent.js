import { get } from "../http.service";
import Params from "../shared";

const listUnderParent = async (edmStorId, page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get(`/eSafeDocuments/listByParent/${edmStorId}`, params);
  return {
    content: response && response._embedded ? response._embedded.eSafeDocuments : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};
export default listUnderParent;
