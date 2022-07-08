import { downloadFile } from "../../../../utils";

const downloadOrgCategories = () => downloadFile("/categoryRefs/download");

export default downloadOrgCategories;
