import { downloadFile } from "../../../../utils";

const downloadTaxTypes = () => downloadFile("/taxRefs/download");

export default downloadTaxTypes;
