import { get } from "../../../http.service";
import Params from "../../../shared";

const proceduresList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/nationalProcedureRefs", params);
  return {
    content:
      (response
        && response._embedded
        && response._embedded.nationalProcedureRefs)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default proceduresList;
