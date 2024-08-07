import queryString from "query-string";

export const getQueryParams = (url: string) => {
  const parsed = queryString.parseUrl(url);
  return parsed.query;
};
