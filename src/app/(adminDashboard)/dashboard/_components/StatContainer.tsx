import { StatCard } from "@/components/shared/StatCard";
import React from "react";

const StatContainer = () => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 `}>
      <StatCard
        title="Total Users"
        value="7,265"
        change={{ value: "+11.01%", positive: true }}
        className="bg-[#fff]"
      />
      <StatCard
        title="Active Users"
        value="2,318"
        change={{ value: "+6.08%", positive: true }}
        className="bg-[#fff]"
      />
      
    </div>
  );
};

export default StatContainer;
