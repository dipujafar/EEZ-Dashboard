"use client";
import { Image, message, Popconfirm, PopconfirmProps, TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { ArrowDownNarrowWide, Eye } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  location: string;
  date: string;
  type: string;
};
const data: TDataType[] = Array.from({ length: 6 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "Muskan Tanaz",
  email: "muskantanaz@gmail.com",
  location: "Dhanmondi",
  date: "19 Jun 2025",
  type: "User",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};
const RecentlyUser = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
         align: "center",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      align: "center",
      render: (text, record) => (
        <div className="flex  justify-center items-center gap-x-1">
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
      align: "center",
    },
    {
      title: "Account Type",
      dataIndex: "type",
      align: "center",
      filters: [
        {
          text: "User",
          value: "User",
        },
        {
          text: "Admin",
          value: "Admin",
        },
      ],
      filterIcon: () => <ArrowDownNarrowWide color="#fff" />,
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },

    {
      title: " Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
         align: "center",
      render: () => (
        <div className="flex justify-center gap-2">
          <Eye
            size={22}
            color="#78C0A8"
            onClick={() => setOpen(!open)}
            className="cursor-pointer"
          />
          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={confirmBlock}
            okText="Yes"
            cancelText="No"
          >
            <CgUnblock size={22} color="#CD0335" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-2xl">
      <h1 className="  text-xl font-semibold text-text-color px-3 py-5">
        Recent Users
      </h1>
      <DataTable columns={columns} data={data}></DataTable>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default RecentlyUser;
