"use client";
import { Tabs } from "antd";
import HRServiceContainer from "./HRServiceContainer";
import IssueCategoryContainer from "./IssueCategory/IssueCategoryContainer";


const tabData = [
  {
    label: "HR Service",
    key: "1",
    children: <HRServiceContainer/>,
  },
  {
    label: "Issue Category",
    key: "2",
    children: <IssueCategoryContainer />,
  },
];

const ManageSpecialistContainer = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default ManageSpecialistContainer;
