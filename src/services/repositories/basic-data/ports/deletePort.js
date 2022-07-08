import { remove } from "../../../http.service";

const deletePort = async (id) => remove(`/portRefs/${id}`);

export default deletePort;
