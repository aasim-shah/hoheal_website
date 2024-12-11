"use client";

import CustomerReviews from "@/components/CustomerReviews";
import { BarChart } from "@/components/dashboard/BarChart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import Hotels from "@/components/dashboard/Hotels";
import { LineChart } from "@/components/dashboard/LineChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const timeFilters = ["month", "year"];

const Dashboard = () => {
  const { hotelId } = useSelector((state: RootState) => state.hotels);
  const { role } = useSelector((state: RootState) => state.auth);
  const showHotelsRevenueCard = role === "superAdmin" && !hotelId;

  const [timeFilter, setTimeFilter] = useState<TimeFilter>(
    timeFilters[0] as TimeFilter
  );

  const changeTimeFilter = (value: "month" | "year") => {
    if (value === timeFilter) return;
    setTimeFilter(value);
  };

  return (
    <>
      <Select value={timeFilter} onValueChange={changeTimeFilter}>
        <SelectTrigger className="w-[120px] sm:w-[180px] capitalize ml-auto mb-4">
          <SelectValue placeholder="Select a time frame" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timeFilters.map((time) => (
              <SelectItem key={time} value={time} className="capitalize">
                {time}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="space-y-4 h-full">
        <DashboardStats timeFilter={timeFilter} />
        {/* grid */}
        <div className="h-full flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* charts */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {showHotelsRevenueCard && <Hotels timeFilter={timeFilter} />}
            <LineChart timeFilter={timeFilter} />
            <BarChart timeFilter={timeFilter} />
          </div>
          {/* reviews */}
          <CustomerReviews />
        </div>
      </div>{" "}
    </>
  );
};

export default Dashboard;
