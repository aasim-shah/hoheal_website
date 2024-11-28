"use client";

import HotelCard from "@/components/all-hotels/HotelCard";
import Tabs from "@/components/Tabs";
import TopBar from "@/components/TopBar";
import { useState } from "react";

const AllHotels = () => {
  const tabData = ["active", "pending", "rejected"];
  const [selectedTab, setSelectedTab] = useState(tabData[0] || "");
  return (
    <div className="space-y-8">
      <TopBar addButtonTitle="hotel">
        <Tabs
          tabData={tabData}
          selectedTab={selectedTab}
          handleTabClick={setSelectedTab}
        />
      </TopBar>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <HotelCard />
          ))}
      </div>
    </div>
  );
};

export default AllHotels;
