import { downloadFile } from "../../../../utils";

const downloadCountriesGroups = () => downloadFile("/countryGroupRefs/download");

export default downloadCountriesGroups;
