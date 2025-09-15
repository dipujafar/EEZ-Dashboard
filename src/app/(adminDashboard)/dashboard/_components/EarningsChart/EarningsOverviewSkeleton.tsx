import { Skeleton } from "@/components/ui/skeleton";

const EarningsOverviewSkeleton = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yAxisLabels = ['30k', '22.5k', '15k', '7.5k', '0k'];

  return (
    <div className="w-full p-6 bg-card rounded-lg border">
      {/* Header with title and dropdown */}
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-9 w-16 rounded-md" />
      </div>

      {/* Chart area */}
      <div className="relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-sm text-muted-foreground py-2">
          {yAxisLabels.map((_, index) => (
            <Skeleton key={index} className="h-4 w-8" />
          ))}
        </div>

        {/* Chart container */}
        <div className="ml-12 relative">
          {/* Chart area with gradient skeleton */}
          <div className="h-80 w-full relative overflow-hidden rounded-md">
            <Skeleton className="h-full w-full" />
            
            {/* Simulated chart curve pattern */}
            <div className="absolute inset-0 flex items-end">
              <div className="flex w-full h-full items-end space-x-1">
                {Array.from({ length: 50 }).map((_, i) => (
                  <Skeleton 
                    key={i} 
                    className="flex-1 rounded-none" 
                    style={{ 
                      height: `${20 + Math.sin(i * 0.3) * 30 + Math.random() * 20}%` 
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            {months.map((_, index) => (
              <Skeleton key={index} className="h-4 w-6" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsOverviewSkeleton;