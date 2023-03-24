import React, { useState } from "react";
import GraphComponent from "./GraphComponent";
import { UserData } from "../Data";
// import "../App.css";

const StatementComponent = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.monthDay),
    datasets: [
      {
        label: "Refund",
        data: UserData.map((data) => data.refund),
        backgroundColor: "#C8EE44",
        borderColor: "#C8EE44",
        color: "#FFF",
      },
      {
        label: "Completed Transactions",
        data: UserData.map((data) => data.completedTransactions),
        backgroundColor: "#29A073",
        borderColor: "#29A073",
        color: "#FFF",
      },
    ],
    options: {
      legend: {
        labels: {
          fontColor: "blue",
          fontSize: 18,
        },
      },
    },
  });

  return (
    <div>
      <div className="dashboardCardContainer">
        <div className="dashboardCard">Total balance</div>
        <div className="dashboardCard">Total spending</div>
        <div className="dashboardCard">Total saved</div>
      </div>
      <div className="graphComponentDiv">
        <h5 className="portfolioText">Portfolio</h5>
        <GraphComponent chartData={userData} />
      </div>
    </div>
  );
};

export default StatementComponent;
