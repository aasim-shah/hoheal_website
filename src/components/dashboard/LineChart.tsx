"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useApi from "@/hooks/useApi";
import { getRevenueChartData } from "@/lib/api/dashboard";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LineChartSkeleton from "../skeletons/LineChartSkeleton";

interface LineChartData {
  x: number;
  y: number;
}

const getMonthName = (m: number) => format(new Date(0, m - 1), "MMMM");

const ConcatWeek = (w: number) => {
  return `Week ${w}`;
};

export function LineChart({
  timeFilter,
  hotelId,
}: {
  timeFilter: TimeFilter;
  hotelId?: string;
}) {
  const { execute, loading, error, data } = useApi(getRevenueChartData);
  const [chartData, setChartData] = useState<LineChartData[] | null>(null);

  useEffect(() => {
    execute(timeFilter, hotelId);
  }, [timeFilter, hotelId, execute]);

  useEffect(() => {
    if (data) {
      setChartData(
        data.map((item: LineChartData) => ({
          x: timeFilter === "year" ? getMonthName(item.x) : ConcatWeek(item.x),
          y: item.y,
        }))
      );
    }
  }, [data]);

  const XTickFormatter = (v: string) => {
    if (timeFilter === "year") {
      return v.slice(0, 3);
    }
    return v.slice(0, 1) + v.slice(-1);
  };

  const chartConfig = {
    x: { label: `${timeFilter}`, color: "hsl(var(--signature))" },
    y: { label: "Earnings", color: "hsl(var(--signature))" },
  } satisfies ChartConfig;

  if (loading) {
    return <LineChartSkeleton />;
  }
  if (error) {
    toast.error(error);
    console.log(error);
  }
  return (
    <Card className="shadow-lg rounded-md">
      <CardHeader>
        <CardTitle>Revenue Chart</CardTitle>
        <CardDescription className="capitalize">{timeFilter}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          {chartData && chartData.length > 0 ? (
            <ChartContainer
              config={chartConfig}
              className="bg-signature p-4 rounded-lg"
            >
              <RechartLineChart
                data={chartData}
                margin={{ top: 10, right: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke="#c0c0c0"
                  vertical={false}
                />
                <XAxis
                  dataKey="x"
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={XTickFormatter}
                  className="text-[10px] md:text-xs"
                  style={{
                    fill: "#ffffff",
                  }}
                />
                <YAxis
                  dataKey={"y"}
                  axisLine={false}
                  domain={["dataMin", "dataMax"]}
                  tickMargin={10}
                  // tickCount={5}
                  unit={"$"}
                  className="text-[10px] md:text-xs"
                  style={{
                    fill: "#ffffff",
                  }}
                />
                <ChartTooltip
                  cursor={{ stroke: "#c0c0c0", strokeWidth: 1 }}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="y"
                  type="linear"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={{
                    fill: "#ffffff",
                  }}
                  activeDot={{
                    r: 4,
                    fill: "#ffffff",
                    stroke: "#ffffff",
                    strokeWidth: 6,
                  }}
                />
              </RechartLineChart>
            </ChartContainer>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">No data</p>
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
