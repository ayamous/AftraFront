import Params from "../../../shared";
import { get } from "../../../http.service";

const tariffVersionRelationsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/versionTariffBookRefs", params);
  return {
    content: response && response._embedded ? response._embedded.versionTariffBookRefs : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default tariffVersionRelationsList;
