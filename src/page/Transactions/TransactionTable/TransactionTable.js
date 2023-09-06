import React, { useState, useEffect } from "react";
import "./transaction-table.css";
import Table from "react-bootstrap/Table";
import InvoiceModal from "../InvoiceModal/InvoiceModal";
import { Link } from "react-router-dom";
import { useLocalState } from "../../../utils/useLocalStorage";
import axios from 'axios'
// import PrintComponent from "../InvoiceModal/InvoiceModal";
// import { allTransactions } from "../../../TestData";

const TransactionTable = (props) => {
  const [jwt, setJwt] = useLocalState('', 'jwt')
  const [data, setData] = useState({})
  const baseurl = 'https://leverpay-api.azurewebsites.net/api/v1/user/get-user-transactions'
  useEffect(() => {
    axios.get(baseurl, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        setData(res.data);
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])


  const [showInvoice, setShowInvoice] = useState(null);
  const [showInvoices, setShowInvoices] = useState(false);
  const displayInvoice = (item) => {
    setShowInvoice(item);
    // console.log(showInvoice, showInvoice === null);
  };
  useEffect(() => {
    if (showInvoice !== null) {
      localStorage.setItem("currentInvoice", JSON.stringify(showInvoice));
    } else {
      localStorage.setItem("currentInvoice", undefined);
    }
  }, [showInvoice]);
  return (
    <>
      <div className="transactions-table-container">
        <div className="table-title">
          <h5>{props.tableTitle}</h5>
          {/* <a href="/#">View all </a> */}
          <Link to="/customer-support">
            <small style={{ color: "#fff", fontSize: "12px" }}>
              Need help ?
            </small>
          </Link>
        </div>
        <table className="col-md-12 col-12">
          <thead>
            <tr>
              {props.data.headers.map((item) => (
                <th>{item}</th>
              ))}
            </tr>
          </thead>
          {props.data.data.map((item, index) => (
            <tbody>
              <tr>
                <td>
                  {item.name.productType}
                  {/* <br />
                  <small>{item.name.productDetail}</small> */}
                </td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
                <td
                  // onClick={() => {
                  //   displayInvoice(item);
                  //   setShowInvoices(true)
                  // }}
                  className="invoice-td"
                >
                  <Link
                    to='/transactions-invoices'
                    style={{
                      textDecoration: 'none',
                      color: 'green'
                    }}
                    state={{
                      name: item.name.productType,
                      productType: item.type,
                      amt: item.amount,
                      status: item.status,
                      unpaid: true,
                      date: item.date
                    }
                    } > {item.invoice}</Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {/* {showInvoice !== null && <InvoiceModal displayInvoice={displayInvoice} />} */}

      {/* <PrintComponent /> */}
    </>
  );
};
export default TransactionTable;
