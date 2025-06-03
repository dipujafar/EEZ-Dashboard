"use client";
import {
  Image,
  Input,
  message,
  Popconfirm,
  PopconfirmProps,
  TableProps,
} from "antd";
// import UserDetails from "./UserDetails";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { Eye, Search } from "lucide-react";
import EarningDetailsModal from "@/components/(adminDashboard)/earning/EarningDetailsModal";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  amount: number;
  date: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Robert Fox",
  email: "robert@gmail.com",
  amount: 100,
  date: "19 Jun 2025",
  type: "User",
}));



const EarningTable = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={"/user_image1.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10"
          ></Image>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => <p>${text}</p>,
    },
    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Eye
          size={22}
          color="#5C5C5C"
          onClick={() => setOpen(!open)}
        />
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex justify-between items-center px-3 py-5">
        <h1></h1>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#ECECEC]"
          placeholder="Search..."
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={11}></DataTable>
      <EarningDetailsModal open={open} setOpen={setOpen}></EarningDetailsModal>
    </div>
  );
};

export default EarningTable;
