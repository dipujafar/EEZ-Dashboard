"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/utils/DataTable";
import { Input, message, Popconfirm, PopconfirmProps, TableProps } from "antd";
import { CirclePlus, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddIssueCategoryModal from "./AddIssueCategoryModal";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import {
  useDeleteIssueCategoryMutation,
  useGetIssueCategoryQuery,
} from "@/redux/api/issueCategoryApi";
import moment from "moment";
import TableSkeleton from "@/app/(adminDashboard)/manage-features/_components/Skeletons/TableSkeleton";

type TDataType = {
  id: string;
  key?: number;
  serial: string;
  issue_category: string;
  date: string;
};

const IssueCategoryContainer = () => {
  const [isAddTagSuggestionOpen, setIsOpenSuggestionOpen] = useState(false);
  const [deleteIssueCategory] = useDeleteIssueCategoryMutation();
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "11";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  // setQueryData
  const queries: Record<string, string | number> = {};

  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  if (searchValue) queries.searchTerm = searchValue;

  const { data: issueCategoryData, isLoading } =
    useGetIssueCategoryQuery(queries);

  // delete issue category
  const confirmBlock = async (id: string) => {
    try {
      await deleteIssueCategory(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  const data: TDataType[] = issueCategoryData?.data?.data?.map(
    (data: any, inx: number) => ({
      id: data?._id,
      key: inx,
      serial: `# ${
        Number(page) === 1
          ? inx + 1
          : (Number(page) - 1) * Number(limit) + inx + 1
      }`,
      issue_category: data?.name,
      date: moment(data?.createdAt).format("ll"),
    })
  );

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
    },
    {
      title: "Issue Category",
      dataIndex: "issue_category",
    },

    {
      title: " Date",
      dataIndex: "date",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, rec) => (
        <Popconfirm
          title="Are you sure?"
          description="You want delete this category?"
          onConfirm={() => confirmBlock(rec?.id as string)}
          okText="Yes"
          cancelText="No"
        >
          {" "}
          <Trash2 className="text-red-500 cursor-pointer" size={20} />
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
            <CirclePlus /> Add New Issue Category
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
          total={issueCategoryData?.data?.meta?.total}
        ></DataTable>
      )}
      <AddIssueCategoryModal
        open={isAddTagSuggestionOpen}
        setOpen={setIsOpenSuggestionOpen}
      />
    </div>
  );
};

export default IssueCategoryContainer;
