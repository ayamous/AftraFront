import { unSlash } from "../../utils";

const login = async ({ username, password }) => {
  const url = `${unSlash(process.env.REACT_APP_KEYCLOAK_PATH)}/realms/${
    process.env.REACT_APP_KEYCLOAK_REALM
  }/protocol/openid-connect/token`;

  return fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Accept: "application/json"
    },
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({
      username,
      password,
      client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
      grant_type: "password",
      client_secret: process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET
    })
  });
};

export default login;
