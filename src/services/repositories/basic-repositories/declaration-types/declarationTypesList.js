import { get } from "../../../http.service";
import Params from "../../../shared";

const declarationTypesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/declarationTypeRefs", params);
  return {
    content:
      response && response._embedded
        ? response._embedded.declarationTypeRefs
        : null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default declarationTypesList;
