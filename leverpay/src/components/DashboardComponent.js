import React, { useState } from "react";
import GraphComponent from "./GraphComponent";
import { UserData } from "../Data";
import RecentTransactionComponent from "./RecentTransactionComponent";
import StatementComponent from "./StatementComponent";

const DashboardComponent = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.monthDay),
    datasets: [
      {
        label: "Refund",
        data: UserData.map((data) => data.refund),
        backgroundColor: "yellow",
        borderColor: "yellow",
        color: "#FFFFFF",
      },
      {
        label: "Completed Transactions",
        data: UserData.map((data) => data.completedTransactions),
        backgroundColor: "green",
        borderColor: "green",
        color: "#FFFFFF",
      },
    ],
  });
  return (
    <div>
      <div style={{ marginInline: "auto" }}>
        <StatementComponent />
      </div>
      <br />
      <div
        style={{
          width: "700px",
          marginInline: "auto",
          backgroundColor: "#1C1A2E",
          border: "1px solid #282541",
          borderRadius: "10px",
        }}
      >
        {/* Graph component here */}
        <GraphComponent chartData={userData} />
      </div>
      <br />
      <div style={{ marginInline: "auto" }}>
        <RecentTransactionComponent />
      </div>
    </div>
  );
};

export default DashboardComponent;
