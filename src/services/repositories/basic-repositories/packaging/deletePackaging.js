import { remove } from "../../../http.service";

const deletePackaging = async (id) => remove(`/refPackagings/${id}`);

export default deletePackaging;
