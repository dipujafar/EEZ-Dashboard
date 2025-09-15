"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChartSkeletonProps {
  className?: string;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const yAxisLabels = ["30K", "22.5K", "15K", "7.5K", "0"];

const barHeights = [
  "h-16",
  "h-32",  
  "h-24",
  "h-36",
  "h-12",
  "h-28",
  "h-20",
  "h-40",
  "h-26",
  "h-44",
  "h-14",
  "h-30",
];

export function LoadingSkeleton({ className }: ChartSkeletonProps) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-card rounded-lg border", className)}>
      {/* Title Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-7 w-40" />
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-sm text-muted-foreground py-2">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="flex items-center">
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="ml-12 pl-4">
          {/* Grid Lines */}
          <div className="absolute inset-0 ml-12 pl-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="absolute w-full border-t border-border opacity-30"
                style={{ top: `${index * 20}%` }}
              />
            ))}
          </div>

          {/* Bar Chart */}
          <div className="relative flex items-end justify-between gap-3 h-80 pt-2">
            {months.map((month, index) => (
              <div key={month} className="flex flex-col items-center gap-3 flex-1">
                {/* Bar */}
                <div className="w-full flex justify-center">
                  <Skeleton 
                    className={cn(
                      "w-8 animate-pulse rounded-sm",
                      barHeights[index]
                    )} 
                  />
                </div>
                
                {/* Month Label */}
                <div className="text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}