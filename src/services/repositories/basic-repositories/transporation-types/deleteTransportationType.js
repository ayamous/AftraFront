import { remove } from "../../../http.service";

const deleteTransportationType = async (id) => remove(`/refTransportationTypes/${id}`);

export default deleteTransportationType;
