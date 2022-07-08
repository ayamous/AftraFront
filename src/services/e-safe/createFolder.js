import { post } from "../http.service";

const createFolder = async ({ folderName, wrapperFolderId }) => {
  const payload = {
    fileName: folderName,
    edmStorld: wrapperFolderId,
    isFolder: true,
    version: 1.0,
    isStarred: false,
    isSharedDoc: false,
    isSharedFolder: false,
    isArchived: false,
    docType: "type1"
  };

  return post("/eSafeDocuments/newFolder", payload);
};

export default createFolder;
