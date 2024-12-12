"use client";

import CustomerReviews from "@/components/CustomerReviews";
import { BarChart } from "@/components/dashboard/BarChart";
import { LineChart } from "@/components/dashboard/LineChart";

const Feedback = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-2">
      <div className="lg:col-span-2 rounded-lg">
        <LineChart timeFilter="month" />
      </div>
      <CustomerReviews />
    </div>
  );
};

export default Feedback;
