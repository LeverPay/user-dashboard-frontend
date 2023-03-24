import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { KYCDiamondForm } from "../KYCDiamondForm";
import { KYCFormsButton } from "../KYCFormsButton/KYCFormsButton";
import "./kyc-diamond-form-modal.css";
export const KYCDiamondFormModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Diamond Upgrade Form
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          {" "}
          <KYCDiamondForm
            accountType="Diamond Account"
            handleClose={handleClose}
          />
          <Button variant="" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
