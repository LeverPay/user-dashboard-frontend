import Button from "react-bootstrap/Button";
import "./KYCFormsButton.css";
import React, { useState, useEffect } from "react";
import { VerificationMessage } from "../KYCFormsUpgradeMessages/VerificationMessage";
import { ReturnMessage } from "../KYCFormsUpgradeMessages/ReturnMessage";
import SuccessMessage from "../KYCFormsUpgradeMessages/SuccessMessage";

export const KYCFormsButton = (props) => {
  const [verification, setVerification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [returnMessage, setReturnMessage] = useState(false);
  const toggle = () => setVerification(!verification);

  const hnd = () => {};

  useEffect(() => {
    if (verification) {
      const timeout = setTimeout(() => {
        setVerification(false);
        setSuccess(true);

        // props.handleClose ? props.handleClose() : hnd();
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [verification]);

  useEffect(() => {
    if (success) {
      const SuccessTimeout = setTimeout(() => {
        setSuccess(false);
        setReturnMessage(true);
      }, 4000);
      return () => {
        // 👇️ clear timeout when the component unmounts
        return () => clearTimeout(SuccessTimeout);
      };
    }
  }, [success]);

  useEffect(() => {
    if (returnMessage) {
      const ReturnMessageTimeout = setTimeout(() => {
        setReturnMessage(false);
      }, 4000);
      return () => {
        return () => clearTimeout(ReturnMessageTimeout);
      };
    }
  }, [returnMessage]);
  return (
    <>
      <div className="d-grid gap-2 kyc-button">
        <Button variant="" size="lg" className="" onClick={toggle}>
          Submit
        </Button>
        {verification && <VerificationMessage />}
        {returnMessage && <ReturnMessage />}
        {success && <SuccessMessage />}
      </div>
    </>
  );
};
