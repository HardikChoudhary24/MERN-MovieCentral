import React, { useEffect, useState } from "react";
import { fetchPlatforms } from "../utils/streamapi";

const useStream = (url,params,tmdb_id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setData(null);
      const res = await fetchPlatforms(url, params);
      setIsLoading(false);
      setData(res);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url,tmdb_id]);

  return { data, isLoading, isError };
};

export default useStream;
