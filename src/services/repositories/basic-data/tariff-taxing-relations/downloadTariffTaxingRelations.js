import { downloadFile } from "../../../../utils";

const downloadTariffTaxingRelations = () => downloadFile("/tarifBookTaxation/download");

export default downloadTariffTaxingRelations;
