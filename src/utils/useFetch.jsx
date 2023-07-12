"use client";
import { useMemo, useState } from "react";
import { axiosinstance } from "./axiosinstance";

const useFetch = async ({ url }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    const GetProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axiosinstance.get(url);
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    GetProducts();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
