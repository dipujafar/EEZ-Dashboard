"use client";
import { Input, Pagination } from "antd";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { Search } from "lucide-react";
import ManageContentDataCard from "./ManageContentDataCard";
import { AddContentModal } from "./AddContentModal";
import { useState } from "react";
import Empty from "@/components/ui/Empty";
import { ContentFeedSkeleton } from "./Skeletons/ContentFeedSkeleton";

const DailyTips = ({ data, searchText, setSearchText, isLoading }: any) => {
  const [openAddContent, setOpenAddContent] = useState(false);
  return (
    <div className="space-y-1">
      {/* ------------------------------ Add New Content Type ------------------------------ */}
      <Button
        onClick={() => setOpenAddContent(true)}
        style={{
          background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
          boxShadow: " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
        }}
        className="w-full group"
      >
        Add Daily Tips <AnimatedArrow />
      </Button>

      {/* ------------------------------ Search Bar ------------------------------ */}
      <div className="flex justify-between items-center px-3 py-5">
        <div></div>
        <Input
          className="!w-full lg:!w-1/2 xl:!w-1/3 !py-2 placeholder:text-white !border-none !bg-[#dbdbdb]"
          placeholder="Search Here..."
          prefix={<Search size={16} color="#000"></Search>}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></Input>
      </div>
      {/* ------------------------------ Display All Journal Prompts ------------------------------ */}
      { isLoading ? <ContentFeedSkeleton /> : data?.length === 0 ? <Empty message="No Data Found" /> :<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {data?.map((data: any) => (
          <ManageContentDataCard
            key={data?._id}
            id={data?._id}
            title={data?.content}
            date={data?.date}
            status={data?.status}
            imageUrl={data?.image}
          />
        ))}
      </div>}

      <AddContentModal
        isOpen={openAddContent}
        onClose={() => setOpenAddContent(false)}
        onSave={() => {}}
      ></AddContentModal>
    </div>
  );
};

export default DailyTips;
