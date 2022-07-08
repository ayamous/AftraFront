import { downloadFile } from "../../utils";

const downloadDocument = (edmStorld) => downloadFile(`/eSafeDocuments/download/${edmStorld}`);

export default downloadDocument;
