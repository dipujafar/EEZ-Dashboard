"use client";
import { Tabs } from "antd";
import GuidanceHub from "./GuidanceHub/GuidanceHub";
import WorkplaceJournalContainer from "./WorkplaceJournal/WorkplaceJournalContainer";
import CommunicationToolkitContainer from "./CommunicationToolkit/CommunicationToolkitContainer";
import PolicyRightLibraryContainer from "./PolicyRightsLibrary/PolicyRightLibraryContainer";
import JobSearchHelpContainer from "./JobSearchHelp/JobSearchHelpContainer";
import GuidanceSuggestions from "./GuidanceSuggestions/GuidanceSuggestions";

const tabData = [
  {
    label: "Guidance Hub",
    key: "1",
    children: <GuidanceHub />,
  },
  {
    label: "Guidance Suggestions",
    key: "2",
    children: <GuidanceSuggestions />,
  },
  {
    label: "Workplace Journal",
    key: "3",
    children: <WorkplaceJournalContainer />,
  },
  {
    label: "Communication Toolkit",
    key: "4",
    children: <CommunicationToolkitContainer />,
  },
  {
    label: "Policy & Rights Library",
    key: "5",
    children: <PolicyRightLibraryContainer />,
  },
  {
    label: "Job Search Help",
    key: "",
    children: <JobSearchHelpContainer />,
  },
];

const ManageFeaturesContainer = () => {
  return <Tabs defaultActiveKey="1" centered items={tabData} />;
};

export default ManageFeaturesContainer;
