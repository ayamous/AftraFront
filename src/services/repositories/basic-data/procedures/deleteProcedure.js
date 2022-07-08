import { remove } from "../../../http.service";

const deleteProcedure = async (id) => remove(`/nationalProcedureRefs/${id}`);

export default deleteProcedure;
