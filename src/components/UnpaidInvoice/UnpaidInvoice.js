import React from "react";
import UnpaidData from "../../TestData/UnpaidData";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import InvoicesTab from "../InvoicesTab/InvoicesTab";
import "./UnpaidInvoice.css";
import Invoice from "../../page/InvoicePage/Invoice/Invoice";

function UnpaidInvoice(props) {
  const InvoiceData = {
    name: props.name,
    productType: props.type,
    amt: props.amt,
    status: props.status,
    unpaid: true,
    date: props.date,
  };

  return (
    <>
      <table className="Unpaiddata">
        <tbody>
          <tr key={props.id} className="table-data">
            <td>{props.date}</td>
            <td>{props.name}</td>
            <td>{props.amt}</td>
            <td>{props.status}</td>
            <td>
              <Link
                to="/unpaid-invoice"
                state={InvoiceData}
                style={{ color: "green" }}
              >
                {" "}
                View
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
    // </div>
  );
}

export default UnpaidInvoice;
