import { downloadFile } from "../../../../utils";

const downloadCities = () => downloadFile("/cityRefs/download");

export default downloadCities;
