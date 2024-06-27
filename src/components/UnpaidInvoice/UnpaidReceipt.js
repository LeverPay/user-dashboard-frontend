import React, { useEffect, useState } from "react";
import "./UnpaidInvoice.css";
import Invoice from "../../page/InvoicePage/Invoice/Invoice";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import ReceiptCard from "./ReceiptCard";

const UnpaidReceipt = ({ id, setPopUp }) => {
  const [invoiceData, setInvoiceData] = useState([]);

  // const [invoiceData, setInvoiceDtata] = useState(null);

  const jwt = localStorage.getItem("_jwt");

  //Function to fetch an unpaid invoice based on the id of the invoice
  const fetchInvoiceById = async (id) => {
    const response = await axios.get(
      `https://leverpay-api.azurewebsites.net/api/v1/user/invoice-detatails/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
          "X-CSRF-TOKEN": "eR00w7uOM5zEXW1ecOusBCFNXCIREhMWEiLqJxOR",
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    // Fetch the invoice data by ID
    fetchInvoiceById(id)
      .then((response) => {
        console.log("res", response);
        setInvoiceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching invoice:", error);
      });
  }, [id]);

  return (
    <div className="receipt-card-container">
      <ReceiptCard id={id} data={invoiceData} setPopUp={setPopUp} />
    </div>
  );
};

export default UnpaidReceipt;
