import React from "react";
import { Table, Skeleton, Avatar } from "antd";

const UserTableSkeleton = ({ length }: { length?: number }) => {
  // Create placeholder rows
  const data = Array.from({ length: length || 15 }).map((_, i) => ({
    key: i,
  }));

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: 80,
      render: () => <Skeleton.Input style={{ width: 40 }} active size="small" />,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      render: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Skeleton.Avatar active size="small" shape="circle" />
          <Skeleton.Input style={{ width: 120 }} active size="small" />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: () => (
        <Skeleton.Input style={{ width: 180 }} active size="small" />
      ),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",
      width: 120,
      render: () => (
        <Skeleton.Input style={{ width: 60 }} active size="small" />
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      width: 150,
      render: () => (
        <Skeleton.Input style={{ width: 90 }} active size="small" />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      render: () => (
        <div style={{ display: "flex", gap: 10 }}>
          <Skeleton.Avatar active size="small" shape="circle" />
          <Skeleton.Avatar active size="small" shape="circle" />
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="key"
    />
  );
};

export default UserTableSkeleton;
