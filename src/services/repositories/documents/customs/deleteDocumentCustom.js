import { remove } from "../../../http.service";

const deleteDocumentCustom = async ({ documentSetupId, customsRegimId }) => remove(
  `/documentSetupRefs/${documentSetupId}/customsRegimRefs/${customsRegimId}`
);

export default deleteDocumentCustom;
