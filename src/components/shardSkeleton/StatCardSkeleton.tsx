import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card className="bg-white border-0 shadow-sm p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 bg-muted" />
          <Skeleton className="h-7 w-16 bg-muted" />
        </div>
      </div>
    </Card>
  );
}