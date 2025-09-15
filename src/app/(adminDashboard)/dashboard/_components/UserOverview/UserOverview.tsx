"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserChartQuery } from "@/redux/api/chartApis";
import { LoadingSkeleton } from "./LoadingSkeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data for the user overview chart - matches the image pattern

// Custom tooltip component for hover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium">
          {payload[0].value.toLocaleString()} users
        </p>
        <p className="text-xs text-gray-500">{payload[0].payload.month}</p>
      </div>
    );
  }
  return null;
};

// Format y-axis ticks to show 'K' for thousands
// const formatYAxisTick = (value: number) => {
//   if (value === 0) return '0';
//   return `${value / 1000}`;
// };

// Custom bar component to use the color from data
const CustomBar = (props: any) => {
  const { x, y, width, height } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={"#204C48"}
      rx={4}
      ry={4}
    />
  );
};

export const UserOverview: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [selectedYear, setSetSelectedYear] = useState(currentYear);

  const { data, isLoading } = useGetUserChartQuery({ year: selectedYear });

  if (isLoading) return <LoadingSkeleton />;
  return (
    <Card className="w-full bg-[#F9F9FA] border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2 mb-5">
        <CardTitle className="text-xl font-semibold flex items-center">
          User Overview
        </CardTitle>

        <div className="flex-1">
          <div className="w-fit ml-auto ">
            <Popover>
              <PopoverTrigger className="rounded-full" asChild>
                <Button variant="outline" size="sm" className="h-8">
                  {selectedYear} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-24 p-0">
                <div className="flex flex-col">
                  {lastFiveYears?.map((year) => (
                    <Button
                      onClick={() => setSetSelectedYear(year)}
                      key={year}
                      variant="ghost"
                      className="justify-start"
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data?.data?.chartData}
              margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
              barCategoryGap={4}
              barGap={0}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
                tickFormatter={(value: string) =>
                  value?.charAt(0)?.toUpperCase() + value?.slice(1)
                }
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                // tickFormatter={formatYAxisTick}
                // domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ opacity: 0.1 }} />
              <Bar
                dataKey="count"
                shape={<CustomBar />}
                isAnimationActive={true}
                barSize={15}
                radius={[10, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
