import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setData(null);
      const res = await fetchDataFromApi(url);
      setIsLoading(false);
      setData(res);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return {data,isLoading,isError};
};

export default useFetch;
