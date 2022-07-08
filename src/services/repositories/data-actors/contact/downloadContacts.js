import { downloadFile } from "../../../../utils";

const downloadContacts = () => downloadFile("/personalContacts/download");

export default downloadContacts;
