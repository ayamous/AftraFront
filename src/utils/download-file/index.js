import unSlash from "../unslash";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

const downloadFile = async (path) => {
  const url = `${gateway}${path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!res.ok) return;
  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "download";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export default downloadFile;
