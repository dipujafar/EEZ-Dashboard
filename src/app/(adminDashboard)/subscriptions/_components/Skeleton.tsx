// components/SkeletonSection.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"


export default function SubscriptionSectionSkeleton({className, length = 6}:{className?:string, length?:number}) {
  return (
      <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-2 ", className)}>
        {Array.from({ length: length }).map((_, i) => (
          <Card key={i} className="rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-2/3 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
   
  )
}
