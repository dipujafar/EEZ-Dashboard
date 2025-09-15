import EarningsChart from "./_components/EarningsChart/EarningsChart";
import RecentlyUser from "./_components/RecentlyUser";
import StatContainer from "./_components/StatContainer/StatContainer";
import { UserOverview } from "./_components/UserOverview/UserOverview";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-5 space-y-3 ">
      <StatContainer></StatContainer>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <EarningsChart></EarningsChart>
        <UserOverview></UserOverview>
      </div>
      <RecentlyUser />
    </div>
  );
};

export default DashboardPage;
