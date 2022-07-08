import { remove } from "../../../http.service";

const deleteDocumentSubProcedure = async ({
  documentSetupRefId,
  nationalProcedureRefId
}) => remove(
  `/documentSetupRefs/${documentSetupRefId}/extendedProcedureRefs/${nationalProcedureRefId}`
);

export default deleteDocumentSubProcedure;
