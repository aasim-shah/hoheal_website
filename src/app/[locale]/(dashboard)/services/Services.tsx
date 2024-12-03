"use client";

import TopBar from "@/components/TopBar";
import ServiceCard from "@/components/services/ServiceCard";
import CategoryDropdown from "@/components/services/ServiceDropdown";
import useApi from "@/hooks/useApi";
import { getAllServices } from "@/lib/api/service";
import {
  changePagination,
  setError,
  setLoading,
  setServices,
} from "@/store/features/serviceSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../loading";

const Services = () => {
  const { data, loading, error, execute } = useApi(getAllServices);
  const { services, page, pagination } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch();

  useEffect(() => {
    execute({ page });
  }, [execute, page]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    if (data?.success) {
      dispatch(setServices(data?.body?.services || []));
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

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="space-y-8">
      <TopBar addButtonTitle="service">
        <CategoryDropdown />
      </TopBar>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {services?.length > 0 &&
          services.map((service: any) => (
            <ServiceCard service={service} key={service?._id} />
          ))}
      </div>
    </div>
  );
};

export default Services;
