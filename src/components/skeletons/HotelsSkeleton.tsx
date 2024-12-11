import MyCard from "../MyCard";
import SkeletonItem from "../SkeletonItem";
import { Card } from "../ui/card";

const HotelsSkeleton = () => {
  return (
    <MyCard>
      <SkeletonItem w="full" h="32" />
    </MyCard>
  );
};

export default HotelsSkeleton;
