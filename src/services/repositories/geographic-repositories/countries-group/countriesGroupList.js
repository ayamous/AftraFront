import { get } from "../../../http.service";
import Params from "../../../shared";

const countriesGroupList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/countryGroupRefs", params);
  return {
    content:
      (response && response._embedded && response._embedded.countryGroupRefs)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default countriesGroupList;
