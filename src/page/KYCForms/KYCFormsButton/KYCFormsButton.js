import Button from "react-bootstrap/Button";
import "./KYCFormsButton.css";
import React, { useState, useEffect } from "react";
import { VerificationMessage } from "../KYCFormsUpgradeMessages/VerificationMessage";

export const KYCFormsButton = (props) => {
  const [verification, setVerification] = useState(false);
  const toggle = () => setVerification(!verification);
  const [upgradeData, setUgradeData] = useState(null);
  const [btnDisable, setBtnDisable] = useState(true);
  const [section1, setSection1] = useState(0);
  const [section2, setSection2] = useState(0);
  const [section3, setSection3] = useState(0);
  const hnd = () => {};
  useEffect(() => {
    window.addEventListener("storage", () => {
      setUgradeData(localStorage.getItem("upgrade_data", null));
      console.log("Change to local storage!");
      console.log(upgradeData);
      setSection1(parseInt(localStorage.getItem("section_1", 0)));
      setSection2(parseInt(localStorage.getItem("section_2", 0)));
      setSection3(parseInt(localStorage.getItem("section_3", 0)));
    });
  });
  useEffect(() => {
    setBtnDisable(section1 < 1 || section2 < 1);
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
