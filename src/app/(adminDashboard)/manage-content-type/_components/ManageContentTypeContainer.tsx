"use client";;
import { Tabs } from "antd";
import JournalPrompt from "./JournalPrompt";
import DailyTips from "./DailyTips";
import Advertisements from "./Advertisements";
import { useGetManageContentQuery } from "@/redux/api/manageContentApi";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import PaginationSection from "@/components/shared/pagination/PaginationSection";

const ManageContentTypeContainer = () => {
  const [activeTab, setActiveTab] = useState("journal");

  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "9";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  console.log(searchValue);

  // -------------- set queries --------------
  const queries: Record<string, string | number> = {};

  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  if (searchValue) queries.searchTerm = searchValue;
  if (activeTab) queries.contentType = activeTab;

  const { data: manageContentData, isLoading } =
    useGetManageContentQuery(queries);

  // ---------------- handle function to set active tab -----------------
  const handleTabChange = (key: string) => {
    switch (key) {
      case "1":
        setActiveTab("journal");
        break;
      case "2":
        setActiveTab("dailyTips");
        break;
      case "3":
        setActiveTab("advertisements");
        break;
      default:
        setActiveTab("journal");
    }
  };

  // ---------------- tabs data ----------------
  const tabData = [
    {
      label: "Journal Prompt",
      key: "1",
      children: (
        <JournalPrompt
          data={manageContentData?.data?.data}
          searchText={searchText}
          setSearchText={setSearchText}
          isLoading={isLoading}
        />
      ),
    },
    {
      label: "Daily Tips",
      key: "2",
      children: (
        <DailyTips
          data={manageContentData?.data?.data}
          searchText={searchText}
          setSearchText={setSearchText}
          isLoading={isLoading}
        />
      ),
    },
    {
      label: "Advertisements",
      key: "3",
      children: (
        <Advertisements
          data={manageContentData?.data?.data}
          searchText={searchText}
          setSearchText={setSearchText}
          isLoading={isLoading}
        />
      ),
    },
  ];



  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        items={tabData}
        onChange={(key) => handleTabChange(key)}
      />

      <div className="w-fit ml-auto mt-2">
        <PaginationSection
          total={manageContentData?.data?.meta?.total}
          current={Number(page)}
          pageSize={Number(limit)}
        />
      </div>
    </>
  );
};

export default ManageContentTypeContainer;
