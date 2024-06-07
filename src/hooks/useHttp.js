import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong while fetching data");
  }

  return data;
}
export default function useHttp(url, config, initialValue) {
  const [error, setError] = useState();
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  function clearData() {
    setData(initialValue);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
