import { ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SkeletonItem from "../SkeletonItem";
import MyCard from "../MyCard";

const LineChartSkeleton = () => {
  return (
    <MyCard>
      <CardHeader>
        <SkeletonItem h="6" w="40" />
        <SkeletonItem h="4" w="20" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <SkeletonItem />
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <SkeletonItem h="5" w="24" />
        <SkeletonItem h="4" w="40" />
      </CardFooter>
    </MyCard>
  );
};

export default LineChartSkeleton;
