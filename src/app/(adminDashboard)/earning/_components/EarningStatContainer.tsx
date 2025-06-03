import { StatCard } from "@/components/shared/StatCard";
import React from "react";

const EarningStatContainer = () => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title="Total Earning"
        value="$1,250.00"
        change={{ value: "+15.03%", positive: true }}
        className="bg-[#fff]"
      />
      <StatCard
        title="Today Earning"
        value="$2,000"
        change={{ value: "+15.03%", positive: true }}
        className="bg-[#fff]"
      />
    </div>
  );
};

export default EarningStatContainer;
