import { get } from "../../../http.service";
import Params from "../../../shared";

const subProceduresList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/extendedProcedureRefs", params);
  return {
    content:
      (response
        && response._embedded
        && response._embedded.extendedProcedureRefs)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default subProceduresList;
