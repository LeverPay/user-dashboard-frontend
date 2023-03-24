import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { KYCGoldForm } from "../KYCGoldForm";
import { KYCFormsButton } from "../KYCFormsButton/KYCFormsButton";
import "./kyc-gold-form-modal.css";
export const KYCGoldFormModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Gold Upgrade Form
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {" "}
          <KYCGoldForm accountType="Gold Account" handleClose={handleClose} />
          <Button variant="" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
