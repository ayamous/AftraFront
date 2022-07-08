import { message } from "antd";

const notifyUserWarn = (msg) => {
  message.warn(msg).then(() => {});
};

export default notifyUserWarn;
