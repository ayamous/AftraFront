import { get } from "../../../http.service";
import Params from "../../../shared";

const documentSubProceduresList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/documentSetupExtendedProcedure/all", params);
  return {
    content: (response && response.content) || null,
    total: (response && response.totalElements) || 0
  };
};

export default documentSubProceduresList;
