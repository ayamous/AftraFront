import { downloadFile } from "../../../../utils";

const downloadTariffHeadings = () => downloadFile("/tarifBookRefs/download");

export default downloadTariffHeadings;
