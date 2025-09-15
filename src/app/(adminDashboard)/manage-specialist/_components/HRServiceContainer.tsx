"use client";
import { Button } from "@/components/ui/button";
import { Input } from "antd";
import { CirclePlus, Search } from "lucide-react";
import React from "react";
import HRServices from "./HRServices";
import Link from "next/link";
import { useGetAllHrAdminsQuery } from "@/redux/api/hrAdminApi";
import { HRServicesPageSkeleton } from "./skeleton/HRServiceSkeleton";

const HRServiceContainer = () => {
  const { data: hrAdminData, isLoading } = useGetAllHrAdminsQuery(undefined);

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
        <h4 className="text-3xl font-bold">20</h4>
      </div>

      {/*  ++++++++++++++++++++++ search option and add new hr service +++++++++++++++++++++     */}
      <div className="flex flex-col lg:flex-row gap-2  justify-between">
        <div className="flex-1">
          <Input
            className="mb-3 h-[35px] "
            prefix={<Search size={18} />}
            placeholder="Search here...."
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
    </div>
  );
};

export default HRServiceContainer;
