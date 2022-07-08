import { get } from "../../../http.service";
import Params from "../../../shared";

const transportationTypesList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/refTransportationTypes", params);
  return {
    content:
      (response
        && response._embedded
        && response._embedded.refTransportationTypes)
      || null,
    total: (response && response.page && response.page.totalElements) || 0
  };
};

export default transportationTypesList;
