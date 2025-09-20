"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/utils/DataTable";
import { Input, message, Popconfirm, PopconfirmProps, TableProps } from "antd";
import { CirclePlus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddTagSuggestion from "./AddTagSuggestion";
import {
  useDeleteWorkplaceTagsMutation,
  useGetWorkplaceTagsQuery,
} from "@/redux/api/workplaceTagsApi";
import moment from "moment";
import TableSkeleton from "../Skeletons/TableSkeleton";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

type TDataType = {
  _id?: string;
  key?: number;
  serial: string;
  tag: string;
  date: string;
};

const WorkplaceJournalContainer = () => {
  const [isAddTagSuggestionOpen, setIsOpenSuggestionOpen] = useState(false);
  const [deleteWorkplaceTag] = useDeleteWorkplaceTagsMutation();

  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "11";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  // setQueryData
  const queries: Record<string, string | number> = {};

  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  if (searchValue) queries.searchTerm = searchValue;

  const { data: workPlaceData, isLoading } = useGetWorkplaceTagsQuery(queries);

  const confirmBlock = async (id: string) => {
    try {
      await deleteWorkplaceTag(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  const data: TDataType[] = workPlaceData?.data?.data?.map(
    (data: any, inx: number) => ({
      _id: data?._id,
      key: inx,
      serial: `# ${Number(page) === 1 ? inx + 1 : (Number(page) - 1) * Number(limit) + inx + 1}`,
      tag: data?.tag,
      date: moment(data?.createdAt).format("ll"),
    })
  );

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
    },
    {
      title: "Suggested Tag",
      dataIndex: "tag",
      align: "center",
    },

    {
      title: " Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, rec) => (
        <Popconfirm
          title="Are you sure?"
          description="You want delete this tag?"
          onConfirm={() => confirmBlock(rec?._id as string)}
          okText="Yes"
          cancelText="No"
        >
          <div className="ml-auto">
            <div className="size-7 flex justify-center items-center bg-red-500 rounded-full cursor-pointer">
              <Trash2 size={18} className="text-white" />
            </div>
          </div>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
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
            onClick={() => setIsOpenSuggestionOpen(true)}
            style={{
              background:
                "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
              boxShadow: " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
            }}
            className="w-full group"
          >
            <CirclePlus /> Add New Tag Suggestion
          </Button>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pageSize={Number(limit)}
          total={workPlaceData?.data?.meta?.total}
        ></DataTable>
      )}
      <AddTagSuggestion
        open={isAddTagSuggestionOpen}
        setOpen={setIsOpenSuggestionOpen}
      />
    </div>
  );
};

export default WorkplaceJournalContainer;
