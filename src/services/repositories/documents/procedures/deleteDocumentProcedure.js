import { remove } from "../../../http.service";

const deleteDocumentProcedure = async ({
  documentSetupRefId,
  nationalProcedureRefId
}) => remove(
  `/documentSetupRefs/${documentSetupRefId}/nationalProcedureRefs/${nationalProcedureRefId}`
);

export default deleteDocumentProcedure;
