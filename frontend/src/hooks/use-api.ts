import { useState } from "react";
import fetchApi from "../utils/fetchApi";
import { json } from "react-router";

const useApi = <T>(path: string, options?: RequestInit) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const fetch = async (data?: Object) => {
    setLoading(true);
    setError(false);
    setData(undefined);
    let body = {};
    if (options && data) {
      options.body = JSON.stringify(data);
    } else if (data) {
      body = { body: JSON.stringify(data) };
    }
    const response = await fetchApi(path, options || body);
    const json = await response.json();
    if (response.ok) {
      setData(json);
    } else {
      setError(json.message ? json.message : "Something went wrong!");
    }
    setLoading(false);
    return json;
  };

  return { data, loading, error, fetch };
};

export default useApi;
