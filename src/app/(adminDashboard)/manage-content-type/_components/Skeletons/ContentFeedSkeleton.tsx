import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const ContentCardSkeleton = () => {
  return (
    <Card className="w-full border border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Checkbox skeleton */}
          <Skeleton className="h-4 w-4 mt-1 flex-shrink-0" />
          
          {/* Avatar skeleton */}
          <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
          
          {/* Content area */}
          <div className="flex-1 space-y-3">
            {/* Title/Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
            
            {/* Date skeleton */}
            <Skeleton className="h-3 w-20" />
            
            {/* Status skeleton */}
            <Skeleton className="h-4 w-24" />
          </div>
          
          {/* Edit button skeleton */}
          <div className="flex-shrink-0">
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ContentFeedSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ContentCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { ContentCardSkeleton, ContentFeedSkeleton };