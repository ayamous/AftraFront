import { put } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const editPort = (id, { code, countryId }) => {
  const payload = {
    code
  };
  if (countryId) payload.countryRef = `${gateway}/countryRefs/${countryId}`;

  return put(`/portRefs/${id}`, payload);
};

export default editPort;
