import { put } from "../../../http.service";

const editTariffVersions = (
  id,
  {
    version,
    enabled,
    status,
    applicatedOn,
    validatedOn,
    archivedOn
  }
) => {
  const payload = {
    version,
    enabled,
    status,
    applicatedOn,
    validatedOn,
    archivedOn
  };

  return put(`/versionRefs/${id}`, payload);
};

export default editTariffVersions;
