import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Invoice from "../../InvoicePage/Invoice/Invoice";
import InvoicePage from "../../InvoicePage/InvoicePage";
import "./invoice-modal.css";
const InvoiceModal = (props) => {
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

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

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>
          {" "}
          <Invoice className="className" />
          <i class="icofont-close-circled" onClick={handleClose}></i>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default InvoiceModal;
