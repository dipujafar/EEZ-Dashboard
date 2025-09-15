"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingPagesSkeleton() {
  return (
    <div>
      <CardHeader className="flex flex-col items-start gap-3">
        {/* Avatar + Title */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-36 rounded" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image Placeholder */}
        <Skeleton className="h-48 min-h-[calc(100vh-20rem)] w-full rounded-xl" />

        {/* Buttons */}

        <Skeleton className="w-full h-10 rounded-lg flex justify-center items-center" >

            <Skeleton className="h-6 w-52"/>
        </Skeleton>
      </CardContent>
    </div>
  );
}
