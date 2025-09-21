"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/utils/DataTable";
import { Input, message, Popconfirm, TableProps } from "antd";
import { CirclePlus, Eye, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddPolicyRightsLibraryModal from "./AddPolicyRightsLibraryModal";
import {
  useDeletePolicyAndRightMutation,
  useGetPolicyAndRightQuery,
} from "@/redux/api/policyAndRightApi";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import moment from "moment";


type TDataType = {
  id: string;
  key?: number;
  serial: string;
  policy_name: string;
  date: string;
};

const PolicyRightLibraryContainer = () => {
  const [isAddTemplateOpen, setIsOpenAddTemplateModal] = React.useState(false);  
  const [deletePolicyAndRight] = useDeletePolicyAndRightMutation();
  const [selectedId, setSelectedId] = useState("");
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "11";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);

  // setQueryData
  const queries: Record<string, string | number> = {};

  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  if (searchValue) queries.searchTerm = searchValue;


  const { data: policyAndRightData } = useGetPolicyAndRightQuery(queries);

  const data: TDataType[] = policyAndRightData?.data?.data?.map(
    (data: any, inx: number) => ({
      id: data?._id,
      key: inx,
      serial: `# ${
        Number(page) === 1
          ? inx + 1
          : (Number(page) - 1) * Number(limit) + inx + 1
      }`,
      policy_name: data?.title,
      date: moment(data?.createdAt).format("ll"),
    })
  );



   const confirmBlock = async (id: string) => {
    try {
      await deletePolicyAndRight(id).unwrap();
      message.success("Successfully deleted.");
    } catch (error: any) {
      message.error(error?.data?.message);
    }
  };

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
    },
    {
      title: "Policy name",
      dataIndex: "policy_name",
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
        <div className="flex gap-x-2">
          {" "}
          <Eye
            onClick={() => {
              setSelectedId(rec?.id as string);
              setIsOpenAddTemplateModal(true);

            }}
            size={20}
            color="#78C0A8"
          />{" "}
          <Popconfirm
            title="Are you sure?"
            description="You want delete this?"
            onConfirm={() => confirmBlock(rec?.id as string)}
            okText="Yes"
            cancelText="No"
          >
            <div className="">
              <div className="size-6 flex justify-center items-center bg-red-500 rounded-full cursor-pointer">
                <Trash2 size={16} className="text-white" />
              </div>
            </div>
          </Popconfirm>
        </div>
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
            onClick={() => setIsOpenAddTemplateModal(true)}
            style={{
              background:
                "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)",
              boxShadow: " 7px 8px 4.7px 0px rgba(0, 0, 0, 0.08) inset",
            }}
            className="w-full group"
          >
            <CirclePlus /> Add Policy & Rights Library
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={data}></DataTable>
      <AddPolicyRightsLibraryModal
        open={isAddTemplateOpen}
        setOpen={setIsOpenAddTemplateModal}
      />
    </div>
  );
};

export default PolicyRightLibraryContainer;
