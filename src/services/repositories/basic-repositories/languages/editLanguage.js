import { put } from "../../../http.service";

const editLanguage = (id, { code, name, def }) => {
  const payload = {
    code,
    name,
    def
  };
  return put(`/langs/${id}`, payload);
};

export default editLanguage;
