"use client";
import { Image, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useGetEarningHistoryQuery } from "@/redux/api/earningApi";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import SubscriptionTableSkeleton from "./skeleton/SubscriptionSkeletonTable";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TDataType = {
  key?: number;
  serial: number;
  providerName: string;
  email: string;
  amount: number;
  date: string;
  profilePic: string;
  subscription_type: "basic" | "premium" | "advanced";
};

const EarningTable = () => {
  // ===================================== calling api with queries ============================
  const page = useSearchParams().get("page") || "1";
  const limit = useSearchParams().get("limit") || "11";
  const [searchText, setSearchText] = useState("");
  const [searchValue] = useDebounce(searchText, 500);
  // ---------------------------- set queries ----------------------------
  const queries: Record<string, string> = {};
  if (page) queries.page = page;
  if (limit) queries.limit = limit;
  if (searchValue) queries.searchTerms = searchValue;

  const { data: earningData, isLoading } = useGetEarningHistoryQuery(queries);

  if (isLoading) return <SubscriptionTableSkeleton />;

  const data: TDataType[] = earningData?.data?.result?.map(
    (data: any, inx: number) => ({
      key: inx,
      serial: inx + 1,
      providerName:
        data?.userId?.profile?.firstName +
        " " +
        data?.userId?.profile?.lastName,
      profilePic: data?.userId?.profile?.profileImage,
      email: data?.userId?.email,
      amount: data?.amount,
      date: moment(data?.createdAt).format("ll"),
      subscription_type: data?.subscriptionId?.type,
    })
  );

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      align: "center",
      render: (text) => <p>#{text}</p>,
    },
    {
      title: "Provider Name",
      dataIndex: "providerName",

      render: (text, record) => (
        <div className="flex  items-center gap-x-1">
          <Avatar>
            <AvatarImage
              src={record?.profilePic}
              alt="profile-picture"
              width={40}
              height={40}
              className="size-10"
            ></AvatarImage>
            <AvatarFallback className="bg-gray-300">
              {record?.providerName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Subscription Type",
      dataIndex: "subscription_type",
      align: "center",
      render: (text) => <p className="capitalize">{text}</p>,
      filters: [
        {
          text: "Basic",
          value: "basic",
        },
        {
          text: "Premium",
          value: "premium",
        },
        {
          text: "Advanced",
          value: "advanced",
        },
      ],
      filterIcon: () => <ArrowDownNarrowWide color="#fff" />,
      onFilter: (value, record) =>
        record.subscription_type.indexOf(value as string) === 0,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (text) => <p>${text}</p>,
    },
    {
      title: " Purchase Date",
      dataIndex: "date",
      align: "center",
    },
  ];

  return (
    <div className="bg-[#F9F9FA] rounded-md">
      <div className="flex justify-between items-center px-3 py-5">
        <Input
          className="md:!min-w-[280px] lg:!w-[250px] !py-2 placeholder:text-white !border-none !bg-[#dbdbdb]"
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable
        columns={columns}
        data={data}
        pageSize={14}
        total={earningData?.data?.meta?.total}
      ></DataTable>
    </div>
  );
};

export default EarningTable;
