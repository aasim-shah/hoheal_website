import React from "react";
import SkeletonItem from "../SkeletonItem";

const CustomerReviewSkeleton = () => {
  return (
    <div
    className={`flex items-start gap-4 p-2 rounded-lg cursor-pointer hover:bg-secondary`}
    >
      <SkeletonItem h="10" w="10" roundedFull />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-end">
          <SkeletonItem h="4" w="20" />
          <SkeletonItem h="2" w="10" />
        </div>
        <div className="space-y-2">
          <SkeletonItem h="3" w="40" />
          <SkeletonItem h="3" w="28" />
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSkeleton;