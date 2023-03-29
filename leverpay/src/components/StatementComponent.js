import React, { useState } from "react";
import GraphComponent from "./GraphComponent";
import { UserData } from "../Data";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import "../Styles/StatementComponent.css";

const StatementComponent = () => {
  const [userData] = useState({
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
    <>
      <div className="dashboardCardContainer">
        <div className="dashboardCard">
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "16px",
              width: "28px",
              height: "28px",
              backgroundColor: "#353255",
              borderRadius: "48px",
            }}
          >
            <MdAccountBalanceWallet
              size={18}
              style={{
                position: "absolute",
                top: "18.8%",
                left: "16.9%",
              }}
            />
          </div>
          <h4 className="dashboardBalance">Total balance</h4>
          <h4 className="balanceAmount">$5230</h4>
        </div>
        {/*  */}
        <div className="dashboardCard">
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "36%",
              width: "28px",
              height: "28px",
              backgroundColor: "#353255",
              borderRadius: "48px",
            }}
          >
            <MdAccountBalanceWallet
              size={18}
              style={{
                position: "absolute",
                top: "18.8%",
                left: "20%",
              }}
            />
          </div>
          <h4 className="dashboardSpending">Total spending</h4>
          <h4 className="spendingAmount">$250.80</h4>
        </div>
        {/*  */}
        <div className="dashboardCard">
          <div
            style={{
              position: "absolute",
              top: "28px",
              left: "70%",
              width: "28px",
              height: "28px",
              backgroundColor: "#353255",
              borderRadius: "48px",
            }}
          >
            <GiWallet
              size={18}
              style={{
                position: "absolute",
                top: "18.8%",
                left: "20%",
                color: "white",
              }}
            />
          </div>
          <h4 className="dashboardSavings">Total saved</h4>
          <h4 className="savingsAmount">$550.25</h4>
        </div>
      </div>
      <GraphComponent chartData={userData} />
    </>
  );
};

export default StatementComponent;
