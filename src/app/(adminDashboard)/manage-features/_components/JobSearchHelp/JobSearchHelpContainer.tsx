"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/utils/DataTable";
import { Input, message, Popconfirm, TableProps } from "antd";
import { CirclePlus, Eye, Search, Trash2 } from "lucide-react";
import React from "react";
import AddJobSearchHelp from "./AddJobSearchHelp";
import { useDeleteJobSearchHelpMutation, useGetJobSearchHelpQuery } from "@/redux/api/jobSearchHelpApi";
import moment from "moment";
import TableSkeleton from "../Skeletons/TableSkeleton";

type TDataType = {
  _id?: string;
  key?: number;
  serial: string;
  help_name: string;
  date: string;
};

const JobSearchHelpContainer = () => {
  const [isAddTemplateOpen, setIsOpenAddTemplateModal] = React.useState(false);
  const [isDetails, setIsDetails] = React.useState(false);
  const { data: jobSearchHelpData, isLoading } = useGetJobSearchHelpQuery({});
  const [deleteJobSearchHelp] = useDeleteJobSearchHelpMutation();

  console.log(jobSearchHelpData?.data?.data);


    const confirmBlock = async (id: string) => {
      try {
        await deleteJobSearchHelp(id).unwrap();
        message.success("Successfully deleted.");
      } catch (error: any) {
        message.error(error?.data?.message);
      }
    };


  const data: TDataType[] = jobSearchHelpData?.data?.data?.map(
    (data: any, inx: number) => ({
      _id: data._id,
      key: inx,
      serial: `# ${inx + 1}`,
      help_name: data?.name,
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
      title: "Help name",
      dataIndex: "help_name",
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
              setIsOpenAddTemplateModal(true);
              setIsDetails(true);
            }}
            size={20}
            color="#78C0A8"
          />{" "}
          <Popconfirm
            title="Are you sure?"
            description="You want delete this tag?"
            onConfirm={() => confirmBlock(rec?._id as string)}
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
            <CirclePlus /> Add Job search Help
          </Button>
        </div>
      </div>

     {isLoading? <TableSkeleton /> : <DataTable columns={columns} data={data}></DataTable>}
      <AddJobSearchHelp
        open={isAddTemplateOpen}
        setOpen={setIsOpenAddTemplateModal}
      />
    </div>
  );
};

export default JobSearchHelpContainer;
