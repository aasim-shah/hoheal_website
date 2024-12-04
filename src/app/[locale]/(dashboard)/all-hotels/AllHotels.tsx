"use client";

import HotelCard from "@/components/all-hotels/HotelCard";
import Tabs from "@/components/Tabs";
import TopBar from "@/components/TopBar";
import { changePage, changeStatus } from "@/store/features/hotelSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../loading";
import Pagination from "@/components/Pagination";

const AllHotels = () => {
  const tabData = ["all", "active", "pending", "rejected"];
  const { hotels, page, pagination, loading, error, status } = useSelector(
    (state: RootState) => state.hotels
  );

  const dispatch = useDispatch();
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
