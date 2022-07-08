import { unSlash } from "../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const request = async (method, uri, params, body) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  });

  const url = new URL(`${gateway}${uri}`);
  if (params) url.search = new URLSearchParams(params).toString();

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body && JSON.stringify(body)
  });

  if (!res.ok) throw new Error(res.status || "API ERROR");

  // this line was added because the Backend team could not respond with a json format on delete
  // 204 no content status
  if (res.status === 204) return "";

  return res.json();
};

const get = async (uri, params) => request("GET", uri, params);
const post = async (uri, payload) => request("POST", uri, null, payload);
const put = async (uri, payload) => request("PATCH", uri, null, payload);
const remove = async (uri) => request("DELETE", uri);

const upload = async (uri, payload) => fetch(`${gateway}${uri}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  method: "POST",
  body: payload
});
export {
  get, post, put, remove, upload
};
