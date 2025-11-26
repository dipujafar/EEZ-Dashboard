"use client";
import { Image, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { Eye } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import moment from "moment";
import { TUserDataType } from "@/types";
import BlockUser from "@/components/shared/BlockUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserTableSkeleton from "@/skeleton/UserTableSkeleton";

const RecentlyUser = () => {
  const [open, setOpen] = useState(false);
  const { data: usersData, isLoading } = useGetAllUsersQuery({ limit: 5 });
  const [currentData, setCurrentData] = useState<TUserDataType | null>(null);

  if(isLoading){

    return <UserTableSkeleton length={5} />
  }

  const data: TUserDataType[] = usersData?.data?.data?.map(
    (data: any, inx: number) => ({
      id: data?._id,
      serial: inx + 1,
      name: data?.profile?.firstName + " " + data?.profile?.lastName,
      email: data?.email,
      profileImage: data?.profile?.profileImage,
      date: moment(data?.createdAt).format("ll"),
      type: data?.role,
      contactNumber: data?.profile?.phoneNumber,
      status: data?.status,
      companyName:data?.profile?.companyName
    })
  );

  const columns: TableProps<TUserDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "User Name",
      dataIndex: "name",

      render: (text, record) => (
        <div className="flex   items-center gap-x-2">
          <Avatar>
            <AvatarImage
              src={record?.profileImage}
              alt="profile-picture"
              width={40}
              height={40}
              className="size-10"
            ></AvatarImage>
            <AvatarFallback className="bg-gray-300">
              {record?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
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
      render: (text, record) => (
        <div className="flex justify-center items-center gap-x-2">
          <p className="">{text}</p>{" "}
          {record?.status === "blocked" && (
            <p className="text-red-600 bg-gray-200 px-2 rounded">Blocked</p>
          )}
        </div>
      ),
    },

    {
      title: "Join Date",
      dataIndex: "date",
      align: "center",
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center gap-2">
          <Eye
            size={22}
            color="#78C0A8"
            onClick={() => {
              setOpen(!open);
              setCurrentData(record);
            }}
            className="cursor-pointer"
          />
          <BlockUser id={record?.id as string} status={record?.status} />
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
      <UserDetails
        open={open}
        setOpen={setOpen}
        data={currentData}
      ></UserDetails>
    </div>
  );
};

export default RecentlyUser;
