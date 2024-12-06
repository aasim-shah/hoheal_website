"use client";

import HotelCard from "@/components/all-hotels/HotelCard";
import Tabs from "@/components/Tabs";
import TopBar from "@/components/TopBar";
import { changePage, changeStatus } from "@/store/features/hotelSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../loading";
import Pagination from "@/components/Pagination";

import useApi from "@/hooks/useApi";
import { getAllHotels } from "@/lib/api/hotel";
import {
  changePagination,
  setError,
  setHotels,
  setLoading,
} from "@/store/features/hotelSlice";
import { useEffect } from "react";

const tabData = ["all", "active", "pending", "rejected"];

const AllHotels = () => {
  const dispatch = useDispatch();
  const { data, loading, error, execute } = useApi(getAllHotels);
  const { hotels, page, pagination, status } = useSelector(
    (state: RootState) => state.hotels
  );

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

  const handlePageChange = (page: number) => {
    dispatch(changePage(page));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex-grow space-y-8">
        <TopBar addButtonTitle="hotel">
          <Tabs
            tabData={tabData}
            selectedTab={status}
            handleTabClick={(status) => dispatch(changeStatus(status))}
          />
        </TopBar>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {hotels?.length > 0 &&
            hotels.map((hotel: any) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
        </div>
      </div>
      <Pagination
        page={page}
        pagination={pagination}
        changePage={handlePageChange}
      />
    </>
  );
};

export default AllHotels;
