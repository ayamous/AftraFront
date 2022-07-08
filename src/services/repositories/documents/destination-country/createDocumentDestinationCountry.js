import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const createDocumentDestinationCountry = async ({ documentId, countryId }) => {
  const payload = {
    _links: {
      self: {
        href: `${gateway}/countryRefs/${countryId}`
      }
    }
  };
  return post(
    `/documentSetupRefs/${documentId}/countryRefsDocumentSetupDestination`,
    payload
  );
};

export default createDocumentDestinationCountry;
