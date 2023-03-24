import NavComponent from "../components/NavComponent";
import RecentTransactionComponent from "../components/RecentTransactionComponent";
import StatementComponent from "../components/StatementComponent";
import TopNav from "../components/TopNav";
import ShopDetailsComponent from "../components/ShopDetailsComponent";
//import "../App.css";

const DashboardComponent = () => {
  return (
    <div>
      <div>
        <TopNav />
      </div>
      <div>
        <NavComponent />
      </div>
      <div style={{ marginInline: "auto" }}>
        <StatementComponent />
      </div>
      <div style={{ marginInline: "auto" }}>
        <RecentTransactionComponent />
      </div>
      <div>
        <ShopDetailsComponent />
      </div>
    </div>
  );
};

export default DashboardComponent;
