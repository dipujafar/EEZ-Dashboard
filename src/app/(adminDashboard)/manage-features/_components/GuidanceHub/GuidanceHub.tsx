"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import React, { useState } from "react";
import GuidanceHubFeatures from "./GuidanceHubFeatures";
import AddCategoriesScenariosModal from "./AddCategoriesScenariosModal";
import { Input } from "antd";
import { useGetGuidanceHubQuery } from "@/redux/api/guidanceHubApi";
import PaginationSection from "@/components/shared/pagination/PaginationSection";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import GuidanceSkeleton from "./Skeletons/Skeleton";
import Empty from "@/components/ui/Empty";

const GuidanceHub = () => {
  const [isOpenAddCategories, setIsOpenAddCategories] = useState(false);
  const page = useSearchParams()?.get("page") || "1";
  const limit = 9;
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  const queries: Record<string, string | number> = {};


  if (page) queries["page"] = page;
  if (limit) queries["limit"] = limit;
  if (searchValue) queries["searchTerm"] = searchValue;
  const { data: guidanceHubData, isLoading } = useGetGuidanceHubQuery(queries);

  if (isLoading) return <GuidanceSkeleton />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col lg:flex-row gap-2  justify-between">
        <div className="flex-1">
          <Input
            className="mb-3 h-[35px] "
            prefix={<Search size={18} />}
            placeholder="Search here...."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {/* ---------------- Add Categories & Scenarios ---------------- */}
        <div className="flex-1">
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
      {guidanceHubData?.data?.result?.length > 0 ? (
        <GuidanceHubFeatures data={guidanceHubData?.data?.result} />
      ) : (
        <Empty message="No data found" />
      )}

      <div className="w-fit ml-auto">
        <PaginationSection
          total={guidanceHubData?.data?.meta?.total}
          current={Number(page)}
          pageSize={limit}
        />
      </div>
      <AddCategoriesScenariosModal
        open={isOpenAddCategories}
        setOpen={setIsOpenAddCategories}
      
      />
    </div>
  );
};

export default GuidanceHub;
