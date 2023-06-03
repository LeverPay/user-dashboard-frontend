import Button from "react-bootstrap/Button";
import "./KYCFormsButton.css";
import React, { useState, useEffect } from "react";
import { VerificationMessage } from "../KYCFormsUpgradeMessages/VerificationMessage";

export const KYCFormsButton = (props) => {
  const [verification, setVerification] = useState(false);
  const toggle = () => setVerification(!verification);
  const [upgradeData, setUgradeData] = useState(null);
  const [btnDisable, setBtnDisable] = useState(true);
  const hnd = () => {};
  useEffect(() => {
    window.addEventListener("storage", () => {
      setUgradeData(localStorage.getItem("upgrade_data", null));
      console.log("Change to local storage!");
      console.log(upgradeData);
    });
  });
  useEffect(() => {
    setBtnDisable(upgradeData == null);
  }, [upgradeData]);
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
        <Button
          variant=""
          size="lg"
          className=""
          onClick={toggle}
          disabled={btnDisable}
        >
          Submit
        </Button>
        {verification && (
          <VerificationMessage accountType={props.accountType} />
        )}
      </div>
    </>
  );
};
