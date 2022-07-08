const Params = (params) => {
  const res = {};
  if (params.page || params.page === 0) res.page = params.page;
  if (params.size || params.size === 0) res.size = params.size;
  res.sort = "createdOn,desc";

  return res;
};

export default Params;
