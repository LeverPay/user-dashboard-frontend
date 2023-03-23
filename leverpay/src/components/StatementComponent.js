import React from "react";
// import "../App.css";

const StatementComponent = () => {
  return (
    <div>
      <h3>Overview</h3>
      <div className="dashboardCardContainer">
        <div className="dashboardCard">Total balance</div>
        <div className="dashboardCard">Total spending</div>
        <div className="dashboardCard">Total saved</div>
      </div>
    </div>
  );
};

export default StatementComponent;
