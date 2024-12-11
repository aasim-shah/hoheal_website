import SkeletonItem from "../SkeletonItem";
import { Card } from "../ui/card";

const HotelsSkeleton = () => {
  return (
    <Card className="shadow-lg rounded-md">
      <SkeletonItem w="full" h="32" />
    </Card>
  );
};

export default HotelsSkeleton;
