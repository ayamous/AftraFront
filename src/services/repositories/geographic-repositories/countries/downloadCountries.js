import { downloadFile } from "../../../../utils";

const downloadCountries = () => downloadFile("/countryRefs/download");

export default downloadCountries;
