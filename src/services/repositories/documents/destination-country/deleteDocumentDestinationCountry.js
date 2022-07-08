import { remove } from "../../../http.service";

const deleteDocumentDestinationCountry = async ({ documentId, countryId }) => remove(
  `/documentSetupRefs/${documentId}/countryRefsDocumentSetupDestination/${countryId}`
);

export default deleteDocumentDestinationCountry;
