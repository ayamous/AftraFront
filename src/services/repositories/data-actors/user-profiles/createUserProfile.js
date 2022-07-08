import { post } from "../../../http.service";

const createUserProfile = async ({
  reference,
  name,
  rank,
  enabled,
  description
}) => {
  const payload = {
    reference,
    name,
    rank,
    enabled,
    description
  };

  return post("/profils", payload);
};

export default createUserProfile;
