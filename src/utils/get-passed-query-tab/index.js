import { parse } from "query-string";

const getPassedQueryTab = (queryString, tabKeys) => {
  if (!queryString) return tabKeys[0];
  const parsed = parse(queryString);
  if (!tabKeys.includes(parsed.tab)) return tabKeys[0];
  return parsed.tab;
};

export default getPassedQueryTab;
