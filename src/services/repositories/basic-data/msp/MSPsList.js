import Params from "../../../shared";
import { get } from "../../../http.service";

const MSPsList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/sanitaryPhytosanitaryMeasuresRefs/all", params);
  return {
    content: (response && response.content) || null,
    total: (response && response.totalElements) || 0
  };
};

export default MSPsList;
