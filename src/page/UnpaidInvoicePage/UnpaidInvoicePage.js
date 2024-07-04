import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../../utils/useLocalStorage";
import "./UnpaidInvoicePage.css";
import UnpaidReceipt from "../../components/UnpaidInvoice/UnpaidReceipt";
import loadingGif from "../../assets/loading-gif.gif";

function UnpaidInvoicePage() {
  const [data, setData] = useState({});
  const [isdata, setIsdata] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [popUp, setPopUp] = useState(false);
  const [idData, setIdData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://leverpay-api.azurewebsites.net/api/v1/user/get-invoices?status=0",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setLoading(false);
        if (res.data.data.length > 0) {
          setIsdata(true);
        } else setIsdata(false);
      })
      .catch((err) => {
        console.log(err);
        setIsdata(false);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handlePopUp = (id) => {
    console.log(id);
    setIdData(id);
    setPopUp(true);
  };

  return (
    <div className="Unpaid_con">
      <div className="Unpaid">
        <h1>Unpaid Invoices</h1>
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
            {!isdata && loading && (
              <div className="receipt-loading-cont">
                <img src={loadingGif} alt="loading gif" />
              </div>
            )}
            {isdata &&
              data.map((item) => {
                return (
                  <tr key={item.uuid} className="table-data">
                    <td>{formatDate(item.created_at)}</td>
                    <td>{item.product_name}</td>
                    <td>&#8358; {parseInt(parseFloat(item.price))}</td>
                    <td>{item.status ? "Paid" : "Unpaid"}</td>
                    <td>
                      <button
                        className="view-unpaid-receipt"
                        onClick={() => handlePopUp(item.uuid)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            {!isdata && !loading && (
              <tr style={{ textAlign: "center" }}>
                <td>You do not have any Pending Invoice.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {popUp && (
        <div className="unpaid-receipt-popup">
          <UnpaidReceipt id={idData} setPopUp={setPopUp} />
        </div>
      )}
    </div>
  );
}

export default UnpaidInvoicePage;
