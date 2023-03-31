import React, { useState } from "react";
import GraphComponent from "../StatementComponent/GraphComponent/GraphComponent";
import { UserData } from "../../TestData";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import "../StatementComponent/StatementComponent.css";

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
      <div className="dashboardCardContainer col-md-12">
        <div className="dashboardCard col-md-4">
          <div
            style={{
              height: "28px",
              width: "28px",

              // marginTop: "40px",
              paddingLeft: "5px",
              borderRadius: "50%",
              backgroundColor: "#353255",
            }}
          >
            <MdAccountBalanceWallet size={18} style={{}} />
          </div>
          <center>
            <h4 className="dashboardBalance">Total balance</h4>
            <h4 className="balanceAmount">$5230</h4>
          </center>
        </div>
        {/*  */}
        <div className="dashboardCard col-md-4">
          <div
            style={{
              // position: "absolute",
              top: "28px",
              // left: "36%",
              // width: "28px",
              height: "28px",
              width: "28px",
              backgroundColor: "#353255",
              paddingLeft: "5px",
              borderRadius: "50%",
            }}
          >
            <MdAccountBalanceWallet
              size={18}
              style={{
                // position: "absolute",
                top: "18.8%",
                left: "20%",
              }}
            />
          </div>
          <center>
            {" "}
            <h4 className="dashboardSpending">Total spending</h4>
            <h4 className="spendingAmount">$250.80</h4>
          </center>
        </div>
        {/*  */}
        <div className="dashboardCard col-md-4">
          {" "}
          <div
            style={{
              // position: "absolute",
              top: "28px",
              left: "70%",
              // width: "28px",
              height: "28px",
              width: "28px",
              backgroundColor: "#353255",
              paddingLeft: "5px",
              borderRadius: "50%",
            }}
          >
            <GiWallet
              size={18}
              style={{
                // position: "absolute",
                top: "18.8%",
                left: "20%",
                color: "white",
              }}
            />
          </div>
          <center>
            <h4 className="dashboardSavings">Total saved</h4>
            <h4 className="savingsAmount">$550.25</h4>
          </center>
        </div>
      </div>
      <div className="col-md-12">
        {" "}
        <GraphComponent chartData={userData} />
      </div>
    </>
  );
};

export default StatementComponent;
