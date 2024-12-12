"use client";

import CustomerReviews from "@/components/CustomerReviews";

const Feedback = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-11 md:col-span-7 shadow-md border rounded-lg p-4 "></div>
      <CustomerReviews />
    </div>
  );
};

export default Feedback;
