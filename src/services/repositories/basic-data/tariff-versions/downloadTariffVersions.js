import { downloadFile } from "../../../../utils";

const downloadTariffVersions = () => downloadFile("/versionRefs/download");

export default downloadTariffVersions;
