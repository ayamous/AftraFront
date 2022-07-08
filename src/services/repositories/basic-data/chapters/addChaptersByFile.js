import { upload } from "../../../http.service";

const addChaptersByFile = async (formData) => upload("/chapterRefs/import", formData);

export default addChaptersByFile;
