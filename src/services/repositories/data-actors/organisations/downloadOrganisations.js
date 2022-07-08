import { downloadFile } from "../../../../utils";

const downloadOrganisations = () => downloadFile("/organizations/download");

export default downloadOrganisations;
