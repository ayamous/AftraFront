import { downloadFile } from "../../../../utils";

const downloadPorts = () => downloadFile("/portRefs/download");

export default downloadPorts;
