import { post } from "../../../http.service";

const createTransportationType = async ({ code }) => {
  const payload = {
    code
  };
  return post("/refTransportationTypes", payload);
};

export default createTransportationType;
