import { remove } from "../../../http.service";

const deleteDeclarationType = async ({
  documentSetupRefId,
  declarationTypeRefId
}) => remove(
  `/documentSetupRefs/${documentSetupRefId}/declarationTypeRefs/${declarationTypeRefId}`
);

export default deleteDeclarationType;
