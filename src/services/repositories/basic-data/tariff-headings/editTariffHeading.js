import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editTariffHeading = (
  id,
  {
    reference,
    hsCode,
    productYear,
    productExpiryDate,
    chapterRefId,
    unitRefId,
    parentId
  }
) => {
  const payload = {
    reference,
    hsCode,
    productYear,
    productExpiryDate
  };
  if (chapterRefId) payload.chapterRef = `${gateway}/sectionRefs/${chapterRefId}`;
  if (unitRefId) payload.unitRef = `${gateway}/sectionRefs/${unitRefId}`;
  if (parentId) payload.parent = `${gateway}/sectionRefs/${parentId}`;

  return put(`/tarifBookRefs/${id}`, payload);
};

export default editTariffHeading;
