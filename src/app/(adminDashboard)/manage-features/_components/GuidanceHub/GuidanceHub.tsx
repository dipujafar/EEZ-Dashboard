"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import React from "react";
import GuidanceHubFeatures from "./GuidanceHubFeatures";
import AddCategoriesScenariosModal from "./AddCategoriesScenariosModal";
import { Input } from "antd";

const GuidanceHub = () => {
  const [isOpenAddCategories, setIsOpenAddCategories] = React.useState(false);
  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row gap-2  justify-between">
        <div className="flex-1">
          <Input
            className="mb-3 h-[35px] "
            prefix={<Search size={18} />}
            placeholder="Search here...."
          />
        </div>
        {/* ---------------- Add Categories & Scenarios ---------------- */}
        <div  className="flex-1">
          <Button
            onClick={() => setIsOpenAddCategories(true)}
            style={{
              background:
                "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
              boxShadow: " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
            }}
            className="w-full group"
          >
            <CirclePlus /> Add Categories & Scenarios
          </Button>
        </div>
      </div>
      <GuidanceHubFeatures />
      <AddCategoriesScenariosModal
        open={isOpenAddCategories}
        setOpen={setIsOpenAddCategories}
      />
    </div>
  );
};

export default GuidanceHub;
