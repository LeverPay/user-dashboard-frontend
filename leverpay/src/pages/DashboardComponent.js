import RecentTransactionComponent from "../components/RecentTransactionComponent";
import StatementComponent from "../components/StatementComponent";
import TopNav from "../components/TopNav";
import ShopDetailsComponent from "../components/ShopDetailsComponent";
import CardsComponent from "../components/CardsComponent";

const DashboardComponent = () => {
  return (
    <>
      <TopNav />
      <StatementComponent />
      <RecentTransactionComponent />
      <CardsComponent />
      <ShopDetailsComponent />
    </>
  );
};

export default DashboardComponent;
