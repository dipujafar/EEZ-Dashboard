"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetEarningsChartQuery } from "@/redux/api/chartApis";
import EarningsOverviewSkeleton from "./EarningsOverviewSkeleton";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 shadow-md rounded-md border border-gray-100">
        <p className="text-sm font-medium text-black">
          ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">{payload[0].payload.month}</p>
      </div>
    );
  }
  return null;
};

interface EarningsChartProps {
  className?: string;
}

const EarningsChart = ({ className }: EarningsChartProps) => {
  const currentYear = new Date().getFullYear();
  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const [selectedYear, setSetSelectedYear] = useState(currentYear);
  const { data, isLoading } = useGetEarningsChartQuery({ year: selectedYear });

  

  if (isLoading) return <EarningsOverviewSkeleton />;

  return (
    <Card className={`p-6 bg-[#F9F9FA] border-none rounded-2xl  ${className}`}>
      <div className="flex justify-between items-center mb-5">
        <div className="flex-1  border-[#00000033]">
          <CardTitle className="text-xl font-semibold flex items-center">
            Earnings Overview
          </CardTitle>
        </div>

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
      </div>

      <div>
        <ChartContainer
          config={{
            expense: { theme: { light: "#F9F9FA", dark: "#EEEEEFss" } }, // Rose
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data?.data?.monthlyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              className="h-[300px]"
            >
              <defs>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor="#347172" opacity={0.9} />
                  <stop offset="80%" stopColor="#347172" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value: string) =>
                  value?.charAt(0)?.toUpperCase() + value?.slice(1)
                }
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}

                // tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="totalEarnings"
                stroke="#00000066"
                strokeWidth={1}
                fillOpacity={1}
                fill="url(#colorExpense)"
                activeDot={{
                  r: 6,
                  fill: "#8b5cf6",
                  stroke: "#F7F7F8",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default EarningsChart;
