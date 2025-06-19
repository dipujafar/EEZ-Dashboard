"use client";
import { Image, Input, TableProps } from "antd";
import DataTable from "@/utils/DataTable";
import { ArrowDownNarrowWide, Search } from "lucide-react";

type TDataType = {
  key?: number;
  serial: number;
  providerName: string;
  email: string;
  amount: number;
  date: string;
  subscription_type: "Basic" | "Premium";
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  providerName: "Anita@123",
  email: "robert@gmail.com",
  amount: 100,
  date: "19 Jun 2025",
  type: "User",
  subscription_type: inx % 2 === 0 ? "Premium" :  "Basic",
}));



const EarningTable = () => {

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
      align: "center",
      render: (text, record) => (
        <div className="flex justify-center items-center gap-x-1">
          <Image
            src={"/hr-image.png"}
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
      title: "Subscription Type",
      dataIndex: "subscription_type",
      align: "center",
        filters: [
        {
          text: "Basic",
          value: "Basic",
        },
        {
          text: "Premium",
          value: "Premium",
        },
      ],
      filterIcon: () => <ArrowDownNarrowWide color="#fff" />,
      onFilter: (value, record) => record.subscription_type.indexOf(value as string) === 0,
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
          prefix={<Search size={16} color="#000"></Search>}
        ></Input>
      </div>
      <DataTable columns={columns} data={data} pageSize={11}></DataTable>

    </div>
  );
};

export default EarningTable;
