"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { time: "20:15", value: 5 },
  { time: "20:16", value: 12 },
  { time: "20:17", value: 25 },
  { time: "20:18", value: 18 },
  { time: "20:19", value: 22 },
  { time: "20:20", value: 30 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#ffffff",
  },
};

export default function LineChart() {
  return (
    <Card className="bg-gradient-to-b from-teal-500 to-teal-700 rounded-lg shadow-lg p-4">
      <CardContent className="">
        {" "}
        {/* Reduced the height here */}
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                stroke="#e0e0e0"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fill: "#fff", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#fff", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 3]} // Adjusted domain for a smaller gap between grid lines
                ticks={[0, 10, 20, 30]} // Custom tick values to reduce gap
              />
              <ChartTooltip
                cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                content={<ChartTooltipContent />}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ fill: "#ffffff", stroke: "#ffffff", r: 4 }}
                activeDot={{ r: 6, fill: "#ffffff" }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
