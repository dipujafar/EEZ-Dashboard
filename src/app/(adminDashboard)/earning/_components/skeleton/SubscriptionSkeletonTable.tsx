import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";

const SubscriptionTableSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm mt-10">
      <Skeleton className="h-10 w-72 mt-190" />
      {/* Table Header */}
      <div className="bg-main-color px-6 py-4 text-white">
        <div className="grid grid-cols-7 gap-4 items-center">
          <div className="text-table-header-foreground font-medium text-sm">
            Serial
          </div>
          <div className="text-table-header-foreground font-medium text-sm">
            Provider Name
          </div>
          <div className="text-table-header-foreground font-medium text-sm">
            Email
          </div>
          <div className="text-table-header-foreground font-medium text-sm">
            Subscription Type
          </div>
          <div className="text-table-header-foreground font-medium text-sm flex items-center gap-2">
            <Filter className="h-4 w-4" />
          </div>
          <div className="text-table-header-foreground font-medium text-sm">
            Amount
          </div>
          <div className="text-table-header-foreground font-medium text-sm">
            Purchase Date
          </div>
        </div>
      </div>

      {/* Table Body - Skeleton Rows */}
      <div className="bg-table-row">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 items-center px-6 py-4 border-b border-border last:border-b-0"
          >
            {/* Serial */}
            <div className="text-table-row-foreground">
              <Skeleton className="h-4 w-8" />
            </div>

            {/* Provider Name with Avatar */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Email */}
            <div>
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Subscription Type */}
            <div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Filter Column (empty) */}
            <div></div>

            {/* Amount */}
            <div>
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Purchase Date */}
            <div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionTableSkeleton;
