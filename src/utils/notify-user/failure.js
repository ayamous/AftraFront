import { message } from "antd";

const notifyUserFailure = (msg) => {
  message.error(msg).then(() => {});
};

export default notifyUserFailure;
