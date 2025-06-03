"use client";
import { Tabs } from "antd";
import JournalPrompt from "./JournalPrompt";
import { sampleAdvertisementsData, sampleDailyTipsData, samplePromptsData } from "@/data";
import DailyTips from "./DailyTips";
import Advertisements from "./Advertisements";
const tabData = [
  {
    label: 'Journal Prompt',
    key: "1",
    children: <JournalPrompt prompts={samplePromptsData} onEdit={() => {}}/>, 
  },
  {
    label: 'Daily Tips',
    key: "2",
    children: <DailyTips prompts={sampleDailyTipsData} onEdit={() => {}}/>,
  },
  {
    label: ' Advertisements',
    key: "3",
    children: <Advertisements prompts={sampleAdvertisementsData} onEdit={() => {}}/>,
  },
];

const ManageContentTypeContainer = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default ManageContentTypeContainer;
