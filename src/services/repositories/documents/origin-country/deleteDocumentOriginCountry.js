import { remove } from "../../../http.service";

const deleteDocumentOriginCountry = async ({ documentId, countryId }) => remove(
  `/documentSetupRefs/${documentId}/countryRefsDocumentSetupOrigin/${countryId}`
);

export default deleteDocumentOriginCountry;
