import MyCard from "../MyCard";
import SkeletonItem from "../SkeletonItem";
import { Card } from "../ui/card";

const HotelsSkeleton = () => {
  return (
    <MyCard className="flex flex-col h-32 gap-4 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <SkeletonItem h="5" w="24" />
        <SkeletonItem h="5" w="24" />
      </div>
      <div className="border p-1 flex flex-col gap-1">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonItem key={i} h="5" w="60" />
        ))}
      </div>
    </MyCard>
  );
};

export default HotelsSkeleton;
