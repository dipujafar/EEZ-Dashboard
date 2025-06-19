"use client";
import { Tabs } from "antd";
import GuidanceHub from "./GuidanceHub/GuidanceHub";
import WorkplaceJournalContainer from "./WorkplaceJournal/WorkplaceJournalContainer";
import CommunicationToolkitContainer from "./CommunicationToolkit/CommunicationToolkitContainer";
import PolicyRightLibraryContainer from "./PolicyRightsLibrary/PolicyRightLibraryContainer";
import JobSearchHelpContainer from "./JobSearchHelp/JobSearchHelpContainer";

const tabData = [
  {
    label: "Guidance Hub",
    key: "1",
    children: <GuidanceHub />,
  },
  {
    label: "Workplace Journal",
    key: "2",
    children: <WorkplaceJournalContainer />,
  },
  {
    label: "Communication Toolkit",
    key: "3",
    children: <CommunicationToolkitContainer />,
  },
  {
    label: "Policy & Rights Library",
    key: "4",
    children: <PolicyRightLibraryContainer />,
  },
  {
    label: "Job Search Help",
    key: "5",
    children: <JobSearchHelpContainer />,
  },
];

const ManageFeaturesContainer = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default ManageFeaturesContainer;
