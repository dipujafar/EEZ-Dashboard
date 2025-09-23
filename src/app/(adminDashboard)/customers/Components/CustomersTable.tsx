"use client";
import { Image, Input, TableProps } from "antd";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { ArrowDownNarrowWide, Eye, Search } from "lucide-react";
import UserDetails from "@/components/(adminDashboard)/user/UserDetails";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import { TUserDataType } from "@/types";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import BlockUser from "@/components/shared/BlockUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CustomersTable = () => {
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState<TUserDataType | null>(null);

  // ===================================== calling api with queries ============================
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "11";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  const queries: Record<string, string> = {};

  if (page) queries.page = page;
  if (limit) queries.limit = limit;

  if (searchValue) queries.searchTerms = searchValue;

  const { data: usersData, isLoading } = useGetAllUsersQuery(queries);

  // ==================================================================================

  // if(isLoading){

  //   return <UserTableSkeleton />
  // }

  const data: TUserDataType[] = usersData?.data?.data?.map(
    (data: any, inx: number) => ({
      id: data?._id,
      serial: inx + 1,
      name: data?.profile?.firstName + " " + data?.profile?.lastName,
      email: data?.email,
      profileImage: data?.profile?.profileImage,
      location: "Dhanmondi",
      date: moment(data?.createdAt).format("ll"),
      type: data?.role,
      contactNumber: data?.profile?.contactNumber,
      status: data?.status,
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
      filters: [
        {
          text: "USER",
          value: "USER",
        },
        {
          text: "HR",
          value: "HR",
        },
      ],
      filterIcon: () => <ArrowDownNarrowWide color="#fff" />,
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
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
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex justify-between items-center px-3 py-5">
        <div></div>
        <Input
          className="!w-[180px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#ECECEC]"
          placeholder="Search Users..."
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable
        columns={columns}
        data={data}
        pageSize={Number(limit)}
        total={usersData?.data?.meta?.total}
      ></DataTable>
      <UserDetails
        open={open}
        setOpen={setOpen}
        data={currentData}
      ></UserDetails>
    </div>
  );
};

export default CustomersTable;
