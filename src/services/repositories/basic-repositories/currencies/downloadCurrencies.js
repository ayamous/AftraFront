import { downloadFile } from "../../../../utils";

const downloadCurrencies = () => downloadFile("/refCurrencies/download");

export default downloadCurrencies;
