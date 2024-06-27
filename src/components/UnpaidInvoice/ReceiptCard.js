import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
// import Feedback from "../../Feedback/Feedback";
// import { Link } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import TransferOTP from "../../../components/TransferPageComponent/TransferOTP";
import ReactToPrint from "react-to-print";
import TransferOTP from "../TransferPageComponent/TransferOTP";
import closeIcon from "../../assets/images/close-icon.png";

const ReceiptCard = ({
  className,
  invoice,
  ref,
  unpaid,
  date,
  amt,
  status,
  name,
  productType,
  email,
  currency,
  id,
  data,
  setPopUp,
}) => {
  let componentRef = useRef();
  const Navigate = useNavigate();
  //   const [id] = useState(nanoid);
  const [show, setShow] = useState(false);

  function toggleShow(arg) {
    setShow(arg);
  }

  const [qrcode, setQrcode] = useState(id);

  useEffect(() => {
    QRCode.toDataURL(
      id,
      {
        margin: 1,
        width: 70,
        color: {
          dark: "#1C1A2E",
          light: "#F49B09",
        },
      },
      (err, id) => {
        err ? console.log("err") : setQrcode(id);
      }
    );
  });

  function formatDateTime(dateTimeString) {
    // Parse the date string into a Date object
    const date = new Date(dateTimeString);

    // Extract the date components
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
    const year = date.getUTCFullYear();

    // Extract the time components
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    // Determine am or pm
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedHours = hours.toString().padStart(2, "0");

    // Construct the formatted date and time string
    const formattedDateTime = `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;

    return formattedDateTime;
  }

  function formatToTwoDecimalPlaces(num) {
    if (isNaN(num)) {
      throw new Error("Invalid number");
    }
    return num.toFixed(2);
  }

  function closeReceipt() {
    setShow(false);
    setPopUp(false);
  }

  const totalAmount =
    parseFloat(data.price) + parseFloat(data.fee) + parseFloat(data.vat);

  return (
    <div className="receipt-container">
      <div className="receipt-close-btn-container">
        <button className="receipt_close_btn" onClick={closeReceipt}>
          <img src={closeIcon} alt="close icon" />
        </button>
      </div>
      <div ref={componentRef} id="invoice" className="">
        <h4 className="text-center invoice-id">{id}</h4>
        <div className="price_checkout">
          <span className="px-md-3">
            <h5>&#8358; {parseInt(parseFloat(data.price))}</h5>
            <h5>Amount</h5>
          </span>
          <span className="px-md-3">
            <h5>&#8358; {data.fee}</h5>
            <h5>Tax fee</h5>
          </span>
          <span className="px-md-3">
            <h5 style={{ color: "#0EB500" }}>
              {" "}
              &#8358;{" "}
              {data.vat
                ? formatToTwoDecimalPlaces(parseFloat(data.vat))
                : "$0.00"}
            </h5>
            <h5 style={{ color: "#F49B09" }}>Vat</h5>
          </span>
        </div>
        <div className="Invoice_details">
          <h3>INVOICE DETAILS</h3>
          <div>
            <div className="invoice-detail-point">
              <p className="row_details">Status</p>
              <p
                // className="row_details_information"
                style={{
                  color: `${data.status === 0 ? "#f40909" : "#0EB500"}`,
                }}
              >
                {data.status === 0 ? "Unpaid" : "Paid"}
              </p>
            </div>
            <div className="invoice-detail-point">
              <p className="row_details">Currency</p>
              <p
                className="row_details_information naira_detail"
                style={{ color: "#F49B09" }}
              >
                {data.currency && data.currency}
              </p>
            </div>
            <div className="invoice-detail-point">
              <p className="row_details">Created at</p>
              <p
                className="row_details_information"
                // style={{ fontSize: "12px" }}
              >
                {data.created_at && formatDateTime(data.created_at)}
              </p>
            </div>
            <div className="invoice-detail-point">
              <p className="row_details">Items</p>
              <p className="row_details_information">
                {data.product_name && data.product_name}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="Buyer_details">
          <h3>Buyer Information</h3>
          <h5>Email</h5>
          <p>{data.email && data.email}</p>
        </div>
        <hr />

        <div className="total_container">
          <p>
            Total amount{" "}
            <span style={{ color: "#F49B09" }}>
              &#8358; {totalAmount.toFixed(2)}
            </span>
          </p>
          <p>{data.created_at && formatDateTime(data.created_at)}</p>
        </div>
        <hr />

        {/* {unpaid && ( */}
        <div className="accept_decline">
          <button
            onClick={() => {
              Navigate(-1);
            }}
            className="cancel_btn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShow(true);
            }}
            className="approve_btn"
          >
            Approve
          </button>
        </div>
        {/* )} */}
        {/* <hr /> */}
        <TransferOTP show={show} setShow={toggleShow} />
      </div>
      {/* <footer
        style={{
          margin: "auto",
          width: "50%",
          display: "flex",
          marginBottom: "3rem",
          gap: "2rem",
        }}
      >
        <button
          onClick={() => {
            Navigate(-1);
          }}
        >
          Close
        </button>
        <ReactToPrint
          trigger={() => <button className="printbtn">Print</button>}
          content={() => componentRef.current}
        />
      </footer> */}
    </div>
  );
};

export default ReceiptCard;

{
  /* <div className="Payment_received"> */
}
//   <p>
// Payment Recieved for <span>{amt}</span>{" "}
//   </p>
//   <p>
// TXID: <span>( {id.slice(0, 8)} )</span>
//   </p>
//   <p>{invoice ? invoice.date : ""}</p>
{
  /* <p>{time}</p> */
}
{
  /* <main>
            <div>
              <p>Company</p>
              <h6>Apple inc</h6>
              <h6
                style={{ color: "red", marginTop: "3rem", cursor: "pointer" }}
                onClick={() => {
                  Navigate("/customer-support", { state: { txid: id } });
                }}
              >
                Report transaction
              </h6>
            </div>
            <div>
              {qrcode && <img alt="" className="qrcodeCon" src={qrcode} />}
            </div>
          </main> */
}
// </div>;
