import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./invoice.css";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import Feedback from "../../Feedback/Feedback";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TransferOTP from "../../../components/TransferPageComponent/TransferOTP";
import ReactToPrint from "react-to-print";

function Invoice({ className, invoice, ref, unpaid, date, amt, status,name, productType, email, currency}) {
  let componentRef = useRef();
  const Navigate = useNavigate();
  const [id] = useState(nanoid);
  const [show, setShow] = useState(false)

function toggleShow(arg){
  setShow(arg)
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


  return (
    <>
    <Container
        ref={componentRef}
      id="invoice"
      className={`pt-3 px-3 py-4 col-md-4 col-12 ${className}`}
    >
      <h4 className="text-center">{id}</h4> 
      <div className="price_checkout">
        <span className="px-md-3">
          {/* <h5>{invoice ? invoice.amount : "$0.00"}</h5> */}
          <h5>{amt}</h5>
          <h5>Total USD</h5>
        </span>
        <span className="px-md-3">
          <h5>0.45656</h5>
          <h5>Total ETH</h5>
        </span>
        <span className="px-md-3">
          <h5 style={{ color: "#0EB500" }}>
            {invoice ? invoice.amount : "$0.00"}
          </h5>
          <h5 style={{ color: "#F49B09" }}>Paid(ETH)</h5>
        </span>
      </div>
      <div className="Invoice_details">
        <h3>INVOICE DETAILS</h3>
        <Container fluid>
          <Row>
            <Col className="h5">Order ID</Col>
            <Col className="h5">Order1</Col>
          </Row>
          <Row>
            <Col className="row_details">Status</Col>
            <Col
              className="row_details_information"
              style={{ color: "#0EB500" }}
            >
              {/* {invoice ? invoice.status : ""} */}
              {status}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Confirmations</Col>
            <Col className="row_details_information">40</Col>
          </Row>
          <Row>
            <Col className="row_details">Currency</Col>
            <Col
              className="row_details_information"
              style={{ color: "#F49B09" }}
            >
              {currency}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Created at</Col>
            <Col
              className="row_details_information"
              style={{ fontSize: "12px" }}
            >
              {/* {time} */}
              {/* {invoice ? invoice.date : ""} */}
              {date}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Items</Col>
            <Col className="row_details_information">
              {/* {invoice ? invoice.name.productType : ""} */}
              {name}
            </Col>
          </Row>
          <Row>
            <Col className="row_details">Description</Col>
            <Col className="row_details_information">
              {productType}
            </Col>
          </Row>
        </Container>
      </div>
      <hr />
      <div className="Buyer_details">
        <h3>Buyer Information</h3>
        <h5>Email</h5>
        <p>{email}</p>
      </div>
      <hr />
      <div className="Payment_received">
        <p>
          Payment Recieved for <span>{amt}</span>{" "}
        </p>
        <p>
          TXID: <span>( {id.slice(0, 8)} )</span>
        </p>
        <p>{invoice ? invoice.date : ""}</p>
        {/* <p>{time}</p> */}
        <main>
          <div>
            <p>Company</p>
            <h6>Apple inc</h6>
            <h6 style={{color:'red', marginTop: '3rem', cursor:'pointer'}} onClick={()=>{Navigate('/customer-support', {state: {txid: id }})}} >Report transaction</h6>
          </div>
          <div>
            {qrcode && <img alt="" className="qrcodeCon" src={qrcode} />}
          </div>
        </main>
      </div>
        {
          unpaid &&  <div className="accept_decline">
          <button onClick={()=>{
            Navigate(-1)
          }}>Decline</button>
          <button onClick={()=>{
            setShow(true)
          }} >Accept</button>
        </div>
        }
      <hr />
      <TransferOTP show = {show}  setShow={toggleShow} />
    </Container>
    <footer style={{
            margin:'auto',
            width:'50%',
            display:'flex',
            marginBottom:'3rem',
            gap:'2rem'
            }}>
                <button 
                  onClick={()=>{
                    Navigate(-1)
                  }}
                >Close</button>
                <ReactToPrint
              trigger={() => <button className="printbtn">Print</button>}
              content={() => componentRef.current}
            />
            </footer>
    </>
  );
}

export default Invoice;
