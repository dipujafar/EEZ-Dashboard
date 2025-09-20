"use client";
import { Button } from "@/components/ui/button";
import { Input, Pagination } from "antd";
import { CirclePlus, Search } from "lucide-react";
import React, {  useEffect, useState } from "react";
import HRServices from "./HRServices";
import Link from "next/link";
import { useGetAllHrAdminsQuery } from "@/redux/api/hrAdminApi";
import { HRServicesPageSkeleton } from "./skeleton/HRServiceSkeleton";
import { useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { useDebounce } from "use-debounce";
import PaginationSection from "@/components/shared/pagination/PaginationSection";

const HRServiceContainer = () => {
  const updateParams = useUpdateSearchParams();
  const page = useSearchParams()?.get("page") || "1";
  const limit = 9;
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  const queries: Record<string, string | number> = {};
  if (page) queries["page"] = page;
  if (limit) queries["limit"] = limit;
  if (searchValue) queries["searchTerm"] = searchValue;

  const { data: hrAdminData, isLoading } = useGetAllHrAdminsQuery(queries);

  console.log(hrAdminData?.data?.data);
// ------------------- once any one want to search then set page to 1 ------------------------
  useEffect(() => {
    if (searchValue && searchText) {
      updateParams({ page: "1" });
    }
  }, [searchValue, searchText]);



  if (isLoading) {
    return <HRServicesPageSkeleton />;
  }

  return (
    <div className="space-y-3">
      <div
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.04)" }}
        className="p-6 bg-white rounded-lg"
      >
        <h6>Total Specialist</h6>
        <h4 className="text-3xl font-bold">{hrAdminData?.data?.meta?.total}</h4>
      </div>

      {/*  ++++++++++++++++++++++ search option and add new hr service +++++++++++++++++++++     */}
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
          <Link href={"/manage-specialist/add-hr-service"}>
            <Button
              style={{
                background:
                  "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
                boxShadow: " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
              }}
              className="w-full group"
            >
              <CirclePlus /> Add New HR Service
            </Button>
          </Link>
        </div>
      </div>

      {/* ++++++++++++++++++++++ hr service data +++++++++++++++++++++ */}
      <HRServices data={hrAdminData?.data?.data} />
      <PaginationSection total={hrAdminData?.data?.meta?.total} current={Number(page) || 1} pageSize={limit} />
    
    </div>
  );
};

export default HRServiceContainer;
