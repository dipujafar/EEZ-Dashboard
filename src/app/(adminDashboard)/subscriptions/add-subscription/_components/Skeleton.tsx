// components/SkeletonSubscriptionForm.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonSubscriptionForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-1/3" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-1/2" />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Plan Information Section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" /> {/* Section Title */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Features & Permissions Section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" /> {/* Section Title */}
          <Skeleton className="h-24 w-full rounded-md" />
        </div>

        {/* Plan Validity Section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" /> {/* Section Title */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" /> {/* Radio */}
                <Skeleton className="h-4 w-20" /> {/* Label */}
              </div>
            ))}
          </div>
          {/* Optional custom input */}
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}
