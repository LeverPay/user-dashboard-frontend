import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import KYCForms from "../KYCForms";
import { KYCFormsButton } from "../KYCFormsButton/KYCFormsButton";
import "./kyc-gold-form-modal.css";
const KYCFormModal = (props) => {
  const [show, setShow] = useState(false);
  const [accType, setAccType] = useState("");

  const handleClose = () => {
    setShow(false);
    props.callback("done");
  };
  const handleShow = (acc) => {
    if (acc !== accType) setAccType(acc);
  };
  useEffect(() => {
    if (accType !== "") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [accType]);
  useEffect(() => {
    handleShow(props.acct);
    // console.log("handle show dey here o");
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {" "}
          <KYCForms accountType={accType} handleClose={handleClose} />
          {/* <Button variant="" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default KYCFormModal;