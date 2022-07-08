import { downloadFile } from "../../../../utils";

const downloadTaxing = () => downloadFile("/taxations/download");

export default downloadTaxing;
