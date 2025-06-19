"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/utils/DataTable";
import { Input, message, Popconfirm, PopconfirmProps, TableProps } from "antd";
import { CirclePlus, Search, Trash2 } from "lucide-react";
import React from "react";
import AddIssueCategoryModal from "./AddIssueCategoryModal";


  const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    message.success("Blocked the user");
  };

type TDataType = {
  key?: number;
  serial: string;
  issue_category: string;
  date: string;
};
const data: TDataType[] = Array.from({ length: 6 }).map((data, inx) => ({
  key: inx,
  serial: `# ${inx + 1}`,
  issue_category: "Harrasment",
  date: "11 Feb, 2025",
}));




const columns: TableProps<TDataType>["columns"] = [
  {
    title: "Serial",
    dataIndex: "serial",
    align: "center",
  },
  {
    title: "Issue Category",
    dataIndex: "issue_category",
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
    render: () => (
      <Popconfirm
        title="Are you sure?"
        description="You want delete this category?"
        onConfirm={confirmBlock}
        okText="Yes"
        cancelText="No"
      >
        {" "}
        <Trash2 className="text-red-500 cursor-pointer" size={20} />
      </Popconfirm>
    ),
  },
];

const IssueCategoryContainer = () => {
  const [isAddTagSuggestionOpen, setIsOpenSuggestionOpen] =
    React.useState(false);
  return (
    <div>
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

      <DataTable columns={columns} data={data}></DataTable>
      <AddIssueCategoryModal
        open={isAddTagSuggestionOpen}
        setOpen={setIsOpenSuggestionOpen}
      />
    </div>
  );
};

export default IssueCategoryContainer;
