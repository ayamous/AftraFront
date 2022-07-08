import { remove } from "../../../http.service";

const deleteDeclarationType = async (id) => remove(`/declarationTypeRefs/${id}`);

export default deleteDeclarationType;
