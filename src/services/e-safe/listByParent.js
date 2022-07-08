import { get } from "../http.service";

const listByParent = async () => {
  const response = await get("/eSafeDocuments/listByParent/-1");
  return {
    content: response && response._embedded ? response._embedded.eSafeDocuments : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default listByParent;
