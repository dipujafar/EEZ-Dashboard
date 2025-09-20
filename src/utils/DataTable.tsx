"use client";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Table } from "antd";
import { useSearchParams } from "next/navigation";

const DataTable = ({
  columns,
  data,
  pageSize,
  total,
}: {
  columns: any;
  data: any;
  pageSize?: number;
  total?: number;
}) => {
  const updateParams = useUpdateSearchParams();
  const page = useSearchParams()?.get("page") || "1";
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={
        pageSize
          ? {
              pageSize,
              defaultCurrent: Number(page) || 1,
              total: total ?? data?.length,
              onChange: (page) => {
                updateParams({ page: page.toString()});
              },
            }
          : false
      }
      scroll={{ x: "max-content" }}
      rowKey={(record) => record.id || record.key} // always good to add rowKey
    />
  );
};

export default DataTable;
