import { getToken } from "./auth";

const fetchApi = (path: string, options: RequestInit) => {
  if (!options.headers) {
    options.headers = {} as HeadersInit;
  }
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authentication: `Bearer ${getToken()}`,
  };
  const url = `http://localhost:5000${path}`;
  return fetch(url, options);
};

export default fetchApi;
