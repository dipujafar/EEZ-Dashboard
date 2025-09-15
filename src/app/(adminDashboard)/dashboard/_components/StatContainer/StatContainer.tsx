"use client";
import { StatCard } from "@/components/shared/StatCard";
import { EarningGrowthIcon, PeopleIcon } from "@/icons";
import { useGetStatQuery } from "@/redux/api/statApi";
import { StatCardSkeleton } from "./StatCardSkeleton";

const StatContainer = () => {
  const { data, isLoading } = useGetStatQuery(undefined);

  console.log(data?.data);

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
        title="Total Users"
        value={data?.data?.totalUsers}
        icon={<PeopleIcon />}
        className="bg-[#fff]"
      />
      <StatCard
        title="Total Earning"
        value={`$${data?.data?.totalEarnings}`}
        icon={<EarningGrowthIcon />}
        className="bg-[#fff]"
      />
    </div>
  );
};

export default StatContainer;
