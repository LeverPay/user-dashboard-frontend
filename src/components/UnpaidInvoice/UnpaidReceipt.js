import React, { useEffect, useState } from "react";
import "./UnpaidInvoice.css";
import axios from "axios";
import ReceiptCard from "./ReceiptCard";
import { useLocalState } from "../../utils/useLocalStorage";

const UnpaidReceipt = ({ id, setPopUp }) => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");

  // const [invoiceData, setInvoiceDtata] = useState(null);

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
    setLoading(true);
    // Fetch the invoice data by ID
    fetchInvoiceById(id)
      .then((response) => {
        setInvoiceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching invoice:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="receipt-card-container">
      <ReceiptCard
        id={id}
        data={invoiceData}
        setPopUp={setPopUp}
        loading={loading}
      />
    </div>
  );
};

export default UnpaidReceipt;
