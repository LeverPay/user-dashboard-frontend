import React from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
// import { allTransactions } from "../../../TestData";

export const TransactionTable = (props) => {
  return (
    <>
      <div className="transaction-table-container">
        <div className="table-title">
          <h5> Transaction History</h5>
          <a href="#">View all </a>
        </div>
        <table className="col-md-12">
          <thead>
            <tr>
              {props.data.headers.map((item) => (
                <th>{item}</th>
              ))}{" "}
            </tr>
          </thead>
          <tbody>
            {props.data.data.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.name.productType}
                  <br />
                  <small>{item.name.productDetail}</small>
                </td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
