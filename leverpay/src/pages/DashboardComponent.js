import NavComponent from "../components/NavComponent";
import RecentTransactionComponent from "../components/RecentTransactionComponent";
import StatementComponent from "../components/StatementComponent";
import TopNav from "../components/TopNav";
import ShopDetailsComponent from "../components/ShopDetailsComponent";
import CardsComponent from "../components/CardsComponent";
//import "../App.css";

const DashboardComponent = () => {
  return (
    <>
      <TopNav />
      <NavComponent />
      <StatementComponent />
      <RecentTransactionComponent />
      <CardsComponent />
      <ShopDetailsComponent />
    </>
  );
};

export default DashboardComponent;
