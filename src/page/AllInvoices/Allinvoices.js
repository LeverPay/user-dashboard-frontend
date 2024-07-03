import React from "react";
import "./allInvoice.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import loadingGif from "../../assets/loading-gif.gif";

const Allinvoices = (props) => {
  const [allInvoices, setAllInvoices] = useState({});
  const [isInvoice, setIsInvoice] = useState(false);
  const [loading, setLoading] = useState(false);

  const jwt = localStorage.getItem("_jwt");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://leverpay-api.azurewebsites.net/api/v1/user/get-invoices", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setAllInvoices(res.data.data);

        if (res.data.data.length > 0) {
          setIsInvoice(true);
        } else setIsInvoice(false);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsInvoice(false);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="allInvoices">
      <div className="Unpaid_con">
        <div className="Unpaid">
          <h1>All Invoices</h1>
          <table className="table">
            <thead>
              <tr>
                <td>Date</td>
                <td>Name</td>
                <td>Amount</td>
                <td>Status</td>
                <td>Invoice</td>
              </tr>
            </thead>
          </table>
          <table className="Unpaiddata">
            <tbody>
              {!isInvoice && loading && (
                <div className="receipt-loading-cont">
                  <img src={loadingGif} alt="loading gif" />
                </div>
              )}

              {isInvoice &&
                allInvoices.map((item) => {
                  return (
                    <tr key={item.uuid} className="table-data">
                      <td>{formatDate(item.created_at)}</td>
                      <td>{item.product_name}</td>
                      <td>&#8358; {parseInt(parseFloat(item.price))}</td>
                      <td>{item.status ? "Paid" : "Unpaid"}</td>
                      <td>
                        <Link
                          to="invoices/paid-invoice"
                          state={item.uuid}
                          style={{ color: "green" }}
                        >
                          {" "}
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}

              {!isInvoice && !loading && (
                <tr style={{ textAlign: "center" }}>
                  <td>You do not have any Invoice.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allinvoices;
