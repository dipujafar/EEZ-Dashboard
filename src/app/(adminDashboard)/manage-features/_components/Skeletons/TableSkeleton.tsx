import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
  rows?: number;
}

const TableSkeleton = ({ rows = 8 }: DataTableSkeletonProps) => {
  return (
    <div className="w-full  bg-card rounded-lg shadow-sm border overflow-hidden">
      {/* Table Rows Skeleton */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={`px-6 py-4 ${
              index % 2 === 0 ? "bg-table-row" : "bg-table-row-alt"
            } transition-colors`}
          >
            <div className="grid grid-cols-4 gap-4 items-center">
              {/* Serial skeleton */}
              <div className="flex items-center">
                <Skeleton className="h-4 w-8" />
              </div>

              {/* Suggested Tag skeleton */}
              <div className="flex items-center">
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Date skeleton */}
              <div className="flex items-center">
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Action skeleton */}
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
