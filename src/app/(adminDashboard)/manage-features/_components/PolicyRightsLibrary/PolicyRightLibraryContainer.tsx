"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/utils/DataTable";
import { Input, TableProps } from "antd";
import { CirclePlus, Eye, Search, Trash2 } from "lucide-react";
import React from "react";
import AddPolicyRightsLibraryModal from "./AddPolicyRightsLibraryModal";
import { useDeletePolicyAndRightMutation, useGetPolicyAndRightQuery } from "@/redux/api/policyAndRightApi";

type TDataType = {
  key?: number;
  serial: string;
  policy_name: string;
  date: string;
};

const PolicyRightLibraryContainer = () => {
  const [isAddTemplateOpen, setIsOpenAddTemplateModal] = React.useState(false);
  const [isDetails, setIsDetails] = React.useState(false);

  const {data: policyAndRightData} = useGetPolicyAndRightQuery({})
  const [deletePolicyAndRight] = useDeletePolicyAndRightMutation();

  console.log(policyAndRightData);

  const data: TDataType[] = Array.from({ length: 6 }).map((data, inx) => ({
    key: inx,
    serial: `# ${inx + 1}`,
    policy_name: "Fair Labor Standards Act (FLSA)",
    date: "11 Feb, 2025",
  }));

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
      render: () => (
        <div className="flex gap-x-2">
          {" "}
          <Eye
            onClick={() => {
              setIsOpenAddTemplateModal(true);
              setIsDetails(true);
            }}
            size={20}
            color="#78C0A8"
          />{" "}
          <Trash2 className="text-red-500 cursor-pointer" size={20} />
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
