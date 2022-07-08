import { get } from "../../../http.service";
import Params from "../../../shared";

const countriesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/countryRefs", params);
  return {
    content:
      (response && response._embedded && response._embedded.countryRefs)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default countriesList;
