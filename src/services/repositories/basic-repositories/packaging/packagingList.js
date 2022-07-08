import { get } from "../../../http.service";
import Params from "../../../shared";

const packagingList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/refPackagings", params);
  return {
    content:
      (response && response._embedded && response._embedded.refPackagings)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default packagingList;
