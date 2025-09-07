import React from "react";

interface SkeletonTableProps {
  rows?: number;
  className?: string;
}

export default function UserTableSkeleton({
  rows = 5,
  className = "",
}: SkeletonTableProps) {
  return (
    <div
      className={`animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 border-b border-gray-200 bg-gray-100 p-4 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
        <div className="h-4 w-12 rounded bg-red-700 dark:bg-gray-600" />
        <div className="h-4 w-24 rounded bg-red-700 dark:bg-gray-600" />
        <div className="h-4 w-32 rounded bg-red-700 dark:bg-gray-600" />
        <div className="h-4 w-20 rounded bg-red-700 dark:bg-gray-600" />
        <div className="h-4 w-20 rounded bg-red-700 dark:bg-gray-600" />
        <div className="h-4 w-16 rounded bg-red-700 dark:bg-gray-600" />
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-6 items-center gap-4 px-4 py-3"
          >
            {/* Serial */}
            <div className="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
            {/* User Name */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            {/* Email */}
            <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Account Type */}
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Join Date */}
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            {/* Action */}
            <div className="flex space-x-3">
              <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
