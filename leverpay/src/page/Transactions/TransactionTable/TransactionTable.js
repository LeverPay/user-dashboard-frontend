import React, { useState, useEffect } from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
import InvoiceModal from "../InvoiceModal/InvoiceModal";
// import { allTransactions } from "../../../TestData";

const TransactionTable = (props) => {
  const [showInvoice, setShowInvoice] = useState(null);
  const displayInvoice = (item) => {
    setShowInvoice(item);
    // console.log(showInvoice, showInvoice === null);
  };
  useEffect(() => {
    if (showInvoice !== null) {
      localStorage.setItem("currentInvoice", showInvoice);
    } else {
      localStorage.setItem("currentInvoice", undefined);
    }
  }, [showInvoice]);
  return (
    <>
      <div className="transactions-table-container">
        <div className="table-title">
          <h5>{props.tableTitle}</h5>
          <a href="/#">View all </a>
        </div>
        <table className="col-md-12 col-12">
          <thead>
            <tr>
              {props.data.headers.map((item) => (
                <th>{item}</th>
              ))}{" "}
            </tr>
          </thead>
          <tbody>
            {props.data.data.map((item, index) => (
              <tr>
                <td>
                  {item.name.productType}
                  <br />
                  <small>{item.name.productDetail}</small>
                </td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
                <td
                  onClick={() => {
                    displayInvoice(item);
                  }}
                  className="invoice-td"
                >
                  {item.invoice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showInvoice !== null && <InvoiceModal displayInvoice={displayInvoice} />}
    </>
  );
};
export default TransactionTable;
