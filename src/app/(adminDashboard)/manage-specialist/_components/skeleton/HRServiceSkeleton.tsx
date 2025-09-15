import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function HRServicesPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-12 w-16" />
      </div>

      {/* Search and Action Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-48" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <HRServiceCardSkeleton key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <Skeleton className="h-8 w-8" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-8" />
        ))}
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  )
}

function HRServiceCardSkeleton() {
  return (
    <Card className="p-6">
      <CardContent className="p-0 space-y-4">
        {/* Profile Image and Tags */}
        <div className="flex items-start gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <Skeleton className="h-6 w-6 rounded" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Skeleton className="h-4 w-4 mt-1" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Skeleton className="h-4 w-4 mt-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Edit Button */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}
