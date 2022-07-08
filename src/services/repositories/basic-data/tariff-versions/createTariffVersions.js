import { post } from "../../../http.service";

const createTariffVersions = async ({
  version,
  enabled,
  status,
  applicatedOn,
  validatedOn,
  archivedOn
}) => {
  const payload = {
    version,
    enabled,
    status,
    applicatedOn,
    validatedOn,
    archivedOn
  };

  return post("/versionRefs", payload);
};

export default createTariffVersions;
