import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import Modal from "react-bootstrap/Modal";
import Invoice from "../../InvoicePage/Invoice/Invoice";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./invoice-modal.css";
import { Button } from "react-bootstrap";
import PrintInvoice from "./PrintInvoice";
// import PrintInvoice from "./PrintInvoice";

export default function InvoiceModal(props) {
  let componentRef = useRef();

  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [invoice, setInvoice] = useState({});

  const handleClose = () => {
    setShowStatus(true);
    setShow(false);

    props.displayInvoice(null);
  };
  useEffect(() => {
    if (show === false && showStatus === false) {
      setShow(true);
      setShowStatus(true);
    }
  }, [show, showStatus]);
  useEffect(() => {
    let item = localStorage.getItem("currentInvoice");
    if (item !== undefined && item !== "undefined")
      setInvoice(JSON.parse(item));
    console.log(invoice);
  });
  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>
          {" "}
          <Invoice className="className" invoice={invoice} />
          <div className="flexy flexyM invoicebtn">
            {" "}
            <div className="closebtn">
              {" "}
              <button onClick={handleClose}>Close</button>
            </div>
            <ReactToPrint
              trigger={() => <button className="printbtn">Print</button>}
              content={() => componentRef}
            />{" "}
          </div>
          <div style={{ display: "none" }}>
            <PrintInvoice ref={(el) => (componentRef = el)} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
