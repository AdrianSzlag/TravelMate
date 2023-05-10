import { useCallback, useState } from "react";
import fetchApi from "../utils/fetchApi";

const useApi = <T>(path: string, options?: RequestInit) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetch = async (data?: Object) => {
    setLoading(true);
    let body = {};
    if (options && data) {
      options.body = JSON.stringify(data);
    } else if (data) {
      body = { body: JSON.stringify(data) };
    }
    const response = await fetchApi(path, options || body);
    if (response.ok) {
      const json = await response.json();
      setData(json);
    } else {
      setError(true);
    }
    setLoading(false);
    return response;
  };

  return { data, loading, error, fetch };
};

export default useApi;
