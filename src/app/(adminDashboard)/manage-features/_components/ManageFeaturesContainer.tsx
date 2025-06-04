"use client";
import { Tabs } from "antd";

const tabData = [
  {
    label: 'Guidance Hub',
    key: "1",
    children: "Guidance Hub", 
  },
  {
    label: 'Workplace Journal',
    key: "2",
    children: "Workplace Journal",
  },
  {
    label: 'Communication Toolkit',
    key: "3",
    children: "Communication Toolkit",
  },
  {
    label: 'Policy & Rights Library',
    key: "4",
    children: "Policy & Rights Library",
  },
  {
    label: 'Job Search Help',
    key: "5",
    children: "Job Search Help",
  },
];

const ManageFeaturesContainer = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default ManageFeaturesContainer;
