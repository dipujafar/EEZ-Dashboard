import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProfileContainerSkeleton() {
  return (
    <div className="flex gap-8 p-6 bg-background ">
      {/* Profile Card Skeleton */}
      <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-card min-w-[280px] h-fit">
        {/* Avatar Skeleton */}
        <Skeleton className="h-24 w-24 rounded-full mb-4" />

        {/* Role/Title Skeleton */}
        <Skeleton className="h-6 w-16 rounded" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="flex-1 space-y-6">
        {/* First Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Last Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
