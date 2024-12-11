import { ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SkeletonItem from "../SkeletonItem";

const BarChartSkeleton = () => {
  return (
    <Card className="shadow-lg rounded-md">
      <CardHeader>
        <SkeletonItem h="6" w="40" />
        <SkeletonItem h="4" w="20" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <SkeletonItem />
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartSkeleton;
