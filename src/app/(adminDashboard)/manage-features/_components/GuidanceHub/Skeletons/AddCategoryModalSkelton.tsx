import { Skeleton } from "@/components/ui/skeleton"

export function AddCategoryModalSkelton() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Upload Image/Icon Section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Category Name Section */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Add Scenario Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Scenario Checkboxes */}
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <Skeleton className="h-11 w-full" />
    </div>
  )
}
