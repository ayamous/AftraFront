import { remove } from "../../../http.service";

const deleteSubProcedures = async (id) => remove(`/extendedProcedureRefs/${id}`);

export default deleteSubProcedures;
