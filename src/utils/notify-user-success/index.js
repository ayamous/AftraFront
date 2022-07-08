import { message } from "antd";

const notifyUserSuccess = (msg) => {
  message
    .success(msg)
    .then()
    .catch(() => {});
};

export default notifyUserSuccess;
