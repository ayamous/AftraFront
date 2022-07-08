import { get } from "../../../http.service";
import Params from "../../../shared";

const documentDestinationCountryList = async (page, size) => {
  const params = Params({
    page,
    size
  });
  const response = await get("/documentSetupRefsCountry/DESTINATION", params);
  return {
    content: (response && response.content) || null,
    total: (response && response.totalElements) || 0
  };
};

export default documentDestinationCountryList;
