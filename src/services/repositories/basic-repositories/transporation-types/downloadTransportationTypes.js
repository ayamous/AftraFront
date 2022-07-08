import { downloadFile } from "../../../../utils";

const downloadTransportationTypes = () => downloadFile("/refTransportationTypes/download");

export default downloadTransportationTypes;
