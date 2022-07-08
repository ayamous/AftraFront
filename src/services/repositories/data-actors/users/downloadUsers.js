import { downloadFile } from "../../../../utils";

const downloadUsers = () => downloadFile("/userAccounts/download");

export default downloadUsers;
