import { downloadFile } from "../../../../utils";

const downloadTariffVersionsRelations = () => downloadFile("/versionTariffBookRef/download");

export default downloadTariffVersionsRelations;
