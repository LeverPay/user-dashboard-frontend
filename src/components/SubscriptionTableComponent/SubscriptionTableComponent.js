import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubscriptionTableComponent = ({ data }) => {
  return (
    <>
      <div className="table-container">
        <table class="table table-striped subscription-table">
          <h4 className="subscription-history-text">Subscription History</h4>
          &nbsp;
          <tr>
            <th className="name-head table-heads">NAME/BUSINESS</th>
            <th className="table-heads">DATE</th>
            <th className="table-heads">TYPE</th>
            <th className="table-heads">AMOUNT</th>
            <th className="table-heads">STATUS</th>
            {/* <th className="table-heads">DESCRIPTION</th> */}
          </tr>
          {data.map((s) => {
            return (
              <tr className="name-tr">
                <td className={s.vendor === "NETFLIX" ? "td-o" : "td-g"}>
                  {s.vendor}
                  <span className="span-name">
                    Subscription
                    <br />
                    Entertainment
                  </span>
                </td>
                <td className="name-td">{s.date}</td>
                <td className="name-td">{s.type}</td>
                <td className="name-td">{s.amount}</td>
                <td
                  className={
                    s.status === "pending"
                      ? "name-td td-status-p"
                      : "name-td td-status"
                  }
                >
                  {s.status}
                </td>
                {s.status === "pending" ? (
                  <td
                    className=" name-td td-status"
                    style={{
                      textDecoration: "none",
                      backgroundColor: "inherit",
                    }}
                    // onClick={handleSelected}
                  >
                    View
                  </td>
                ) : null}
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default SubscriptionTableComponent;
