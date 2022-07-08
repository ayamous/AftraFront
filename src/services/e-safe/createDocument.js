import { post } from "../http.service";

const createDocument = async ({ fileName }) => {
  const payload = {
    fileName
  };

  return post("/eSafeDocuments/newFolder", payload);
};

export default createDocument;
