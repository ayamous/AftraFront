const unSlash = (url) => {
  if (typeof url !== "string") return "";
  const formattedUrl = url.toLowerCase().trim();
  if (formattedUrl.endsWith("/")) return formattedUrl.substr(0, formattedUrl.length - 1);
  return formattedUrl;
};

export default unSlash;
