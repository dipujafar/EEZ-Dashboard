import React from "react";
import EarningStatContainer from "./_components/EarningStatContainer";
import EarningTable from "./_components/EarningTable";

const EarningPage = () => {
  return (
    <div className="space-y-1 ">
      <EarningStatContainer />
      <EarningTable />
    </div>
  );
};

export default EarningPage;
