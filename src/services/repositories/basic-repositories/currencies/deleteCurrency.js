import { remove } from "../../../http.service";

const deleteCurrency = async (id) => remove(`/refCurrencies/${id}`);

export default deleteCurrency;
