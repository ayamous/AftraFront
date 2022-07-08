import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createTariffHeading = async ({
  reference,
  hsCode,
  productYear,
  productExpiryDate,
  chapterRefId,
  unitRefId,
  parentId
}) => {
  const payload = {
    reference,
    hsCode,
    productYear,
    productExpiryDate,
    chapterRef: `${gateway}/chapterRefs/${chapterRefId}`,
    unitRef: `${gateway}/unitRefs/${unitRefId}`,
    parent: `${gateway}/unitRefs/${parentId}`
  };

  return post("/tarifBookRefs", payload);
};

export default createTariffHeading;
