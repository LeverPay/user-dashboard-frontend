import Button from "react-bootstrap/Button";
import "./KYCFormsButton.css";
import React, { useState, useEffect } from "react";
import { VerificationMessage } from "../KYCFormsUpgradeMessages/VerificationMessage";

export const KYCFormsButton = (props) => {
  const [verification, setVerification] = useState(false);
  const toggle = () => setVerification(!verification);

  const hnd = () => {};
  useEffect(() => {
    if (verification) {
      const timeout = setTimeout(() => {
        setVerification(false);
        props.handleClose ? props.handleClose() : hnd();
      }, 1000);
      // timer reduced

      return () => clearTimeout(timeout);
    }
  }, [verification]);
  return (
    <>
      <div className="d-grid gap-2 kyc-button">
        <Button variant="" size="lg" className="" onClick={toggle}>
          Submit
        </Button>
        {verification && (
          <VerificationMessage accountType={props.accountType} />
        )}
      </div>
    </>
  );
};
