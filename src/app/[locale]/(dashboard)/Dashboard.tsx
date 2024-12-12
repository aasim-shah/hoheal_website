"use client";

import CustomerReviews from "@/components/CustomerReviews";
import { BarChart } from "@/components/dashboard/BarChart";
import DashboardStats from "@/components/dashboard/DashboardStats";
import Hotels from "@/components/dashboard/Hotels";
import { LineChart } from "@/components/dashboard/LineChart";
import { HotelsCombobox } from "@/components/HotelsCombobox";
import MyCard from "@/components/MyCard";
import MyImage from "@/components/MyImage";
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
  const { userProfile } = useSelector((state: RootState) => state.auth);
  const { name, email, logo } = userProfile?.hotel || {};
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
      {/* <div className="flex justify-between gap-4 mb-4"> */}
        <MyCard className="flex justify-between gap-4 mb-4 p-4">
        {role === "superAdmin" && <HotelsCombobox />}
        {role === "hotelAdmin" && (
          <div className="flex items-center gap-4">
            <MyImage
              src={logo}
              alt={name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              containerClasses="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold leading-3">{name}</p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        )}
        <Select value={timeFilter} onValueChange={changeTimeFilter}>
          <SelectTrigger className="w-[120px] sm:w-[180px] capitalize ml-auto bg-signature text-white">
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
      </MyCard>
      <div className="space-y-4 h-full">
        <DashboardStats timeFilter={timeFilter} />
        {/* grid */}
        <div className="h-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* charts */}
          <div className="lg:col-span-2 flex flex-col gap-4">
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
