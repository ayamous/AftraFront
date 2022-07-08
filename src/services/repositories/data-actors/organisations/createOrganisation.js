import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createOrganisation = async ({
  reference,
  acronym,
  name,
  parentId,
  cityId,
  categoryId
}) => {
  const payload = {
    reference,
    acronym,
    name
  };
  if (parentId) payload.parent = `${gateway}/organizations/${parentId}`;
  if (cityId) payload.cityRef = `${gateway}/cityRefs/${cityId}`;
  if (categoryId) payload.categoryRef = `${gateway}/categoryRefs/${categoryId}`;

  return post("/organizations", payload);
};

export default createOrganisation;
