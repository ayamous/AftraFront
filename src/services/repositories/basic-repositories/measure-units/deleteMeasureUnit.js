import { remove } from "../../../http.service";

const deleteMeasureUnit = async (id) => remove(`/unitRefs/${id}`);

export default deleteMeasureUnit;
