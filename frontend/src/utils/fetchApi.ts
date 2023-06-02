import { getToken } from "./auth";
const apiURL = "http://localhost:5000";

const fetchApi = (path: string, options: RequestInit) => {
  if (!options.headers) {
    options.headers = {} as HeadersInit;
  }
  if (options.body) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }
  const token = getToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authentication: `Bearer ${token}`,
    };
  }
  const url = `${apiURL}${path}`;
  return fetch(url, options);
};

export default fetchApi;

export type ServerResponse = {
  message: string;
};
