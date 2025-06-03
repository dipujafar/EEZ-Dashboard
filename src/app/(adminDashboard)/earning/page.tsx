import React from "react";
import EarningStatContainer from "./_components/EarningStatContainer";
import EarningTable from "./_components/EarningTable";

const EarningPage = () => {
  return (
    <div className="lg:space-y-5 space-y-3 ">
      <EarningStatContainer />
      <EarningTable />
    </div>
  );
};

export default EarningPage;
