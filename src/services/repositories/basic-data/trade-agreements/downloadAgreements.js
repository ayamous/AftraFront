import { downloadFile } from "../../../../utils";

const downloadAgreements = () => downloadFile("/agreements/download");

export default downloadAgreements;
