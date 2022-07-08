import { put } from "../../../http.service";

const editUserProfile = (
  id,
  {
    reference, name, rank, enabled, description
  }
) => {
  const payload = {
    reference,
    name,
    rank,
    enabled,
    description
  };
  return put(`/profils/${id}`, payload);
};

export default editUserProfile;
