import { downloadFile } from "../../../../utils";

const downloadCountryGroupRelation = () => downloadFile("/countryGroupRefs/download");

export default downloadCountryGroupRelation;
