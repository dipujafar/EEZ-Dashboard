import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GuidanceCardSkeleton = () => {
  return (
    <Card className="p-6 card-hover" style={{ boxShadow: 'var(--card-shadow)' }}>
      {/* Header with icon and title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg skeleton-shimmer" />
          <Skeleton className="h-5 w-32 skeleton-shimmer" />
        </div>
        <Skeleton className="h-6 w-6 rounded skeleton-shimmer" />
      </div>

      {/* Checklist items */}
      <div className="space-y-3 mb-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-sm skeleton-shimmer" />
            <Skeleton className="h-4 flex-1 skeleton-shimmer" />
          </div>
        ))}
      </div>

      {/* Read More and Date */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-20 skeleton-shimmer" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 skeleton-shimmer" />
          <Skeleton className="h-4 w-24 skeleton-shimmer" />
        </div>
      </div>

      {/* Edit Button */}
      <Skeleton className="h-10 w-full rounded-md skeleton-shimmer" />
    </Card>
  );
};

const GuidanceSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-1 gap-x-2">
          <Skeleton className="h-8 w-64  skeleton-shimmer flex-1" />
          <Skeleton className="h-8 w-64 skeleton-shimmer flex-1" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }, (_, i) => (
            <GuidanceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidanceSkeleton;