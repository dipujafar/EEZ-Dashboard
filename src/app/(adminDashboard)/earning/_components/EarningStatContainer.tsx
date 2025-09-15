"use client";
import { StatCardSkeleton } from "@/components/shardSkeleton/StatCardSkeleton";
import { StatCard } from "@/components/shared/StatCard";
import { EarningGrowthIcon } from "@/icons";
import { useGetStatQuery } from "@/redux/api/statApi";
import React from "react";

const EarningStatContainer = () => {
  const { data, isLoading } = useGetStatQuery(undefined);

  if (isLoading)
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title="Total Earning"
        value={`$${data?.data?.totalEarnings}`}
        icon={<EarningGrowthIcon />}
        className="bg-[#fff]"
      />
      <StatCard
        title="This Month Earning"
        value={`$${data?.data?.totalThisMonthEarnings}`}
        icon={<EarningGrowthIcon />}
        className="bg-[#fff]"
      />
    </div>
  );
};

export default EarningStatContainer;
