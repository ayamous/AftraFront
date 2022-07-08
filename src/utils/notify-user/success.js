import { message } from "antd";

const notifyUserSuccess = (msg) => {
  message.success(msg).then(() => {});
};

export default notifyUserSuccess;
