"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart as RechartBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServicesChartData } from "@/lib/api/dashboard";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import BarChartSkeleton from "../skeletons/BarChartSkeleton";
import { toast } from "sonner";
import MyCard from "../MyCard";

interface BarChartData {
  service: string;
  total: number;
}

export function BarChart({
  timeFilter,
  hotelId,
}: {
  timeFilter: TimeFilter;
  hotelId?: string;
}) {
  const { execute, loading, error, data } = useApi(getServicesChartData);
  const [chartData, setChartData] = useState<BarChartData[] | null>(null);

  useEffect(() => {
    execute(timeFilter, hotelId);
  }, [timeFilter, hotelId, execute]);

  useEffect(() => {
    if (data) {
      const validatedData = data.map((item: BarChartData) => ({
        service: item.service || "Service",
        total: item.total,
      }));
      setChartData(validatedData);
    }
  }, [data]);

  const chartConfig = {
    service: {
      label: "Service",
      color: "hsl(var(--chart-1))",
    },
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  if (loading) {
    return <BarChartSkeleton />;
  }
  if (error) {
    toast.error(error);
    console.log(error);
  }

  return (
    <MyCard>
      <CardHeader>
        <CardTitle>Services Chart</CardTitle>
        <CardDescription className="capitalize">{timeFilter}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          {chartData && chartData.length > 0 ? (
            <ChartContainer config={chartConfig}>
              <RechartBarChart accessibilityLayer data={chartData as any}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="service"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                  className="text-[10px] md:text-xs lg:text-sm"
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  dataKey={"total"}
                  axisLine={false}
                  tickMargin={20}
                  tickCount={4}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="total"
                  fill="hsl(var(--signature))"
                  radius={[50, 50, 0, 0]}
                  barSize={50}
                />
              </RechartBarChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">No data</p>
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </MyCard>
  );
}
