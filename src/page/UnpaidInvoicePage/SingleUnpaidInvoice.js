import React, { useEffect, useState } from "react";
import "./singleUnpaidInvoice.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleUnpaidInvoice = () => {
  const { id } = useParams();

  const [invoiceData, setInvoiceDtata] = useState(null);

  const jwt = localStorage.getItem("jwt");

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
      })
      .catch((error) => {
        console.error("Error fetching invoice:", error);
      });
  }, [id]);

  return (
    <div>
      <p>SingleUnpaidInvoice for {id}</p>
    </div>
  );
};

export default SingleUnpaidInvoice;
