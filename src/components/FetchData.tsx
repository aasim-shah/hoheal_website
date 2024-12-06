"use client";

import useApi from "@/hooks/useApi";
import { getAllHotels } from "@/lib/api/hotel";
import {
  changePagination,
  setError,
  setHotels,
  setLoading,
} from "@/store/features/hotelSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FetchData = () => {
  const { data, loading, error, execute } = useApi(getAllHotels);
  const { page, status } = useSelector((state: RootState) => state.hotels);
  const dispatch = useDispatch();

  useEffect(() => {
    execute({ page, status });
  }, [execute, page, status]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    if (data?.success) {
      dispatch(setHotels(data?.body?.hotels || []));
      dispatch(
        changePagination({
          totalPages: data?.body?.totalPages,
          currentPage: data?.body?.currentPage,
          pageSize: data?.body?.pageSize,
          totalCount: data?.body?.totalCount,
        })
      );
      dispatch(setError(null));
      dispatch(setLoading(false));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch]);

  return null;
};

export default FetchData;
