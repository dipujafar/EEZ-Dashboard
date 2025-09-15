import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
}

export function StatCard({ title, value, className, icon }: StatCardProps) {
  return (
    <div className={cn("rounded-2xl p-6 flex items-center gap-x-3 ", className)}>
      <div className="size-14  bg-main-color flex justify-center items-center rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-sm text-slate-700 font-medium">{title}</h3>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
