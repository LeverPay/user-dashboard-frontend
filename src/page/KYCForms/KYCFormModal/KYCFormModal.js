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
  const Cancel = () => {
    setShow(false);
    props.callback("");
  };
  // const Cancel = () => {
  //   setShow(false);
  // };
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
          <Button variant="" className="cancel-btn" onClick={Cancel}>
            Cancel
          </Button>{" "}
          <KYCForms accountType={accType} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default KYCFormModal;
