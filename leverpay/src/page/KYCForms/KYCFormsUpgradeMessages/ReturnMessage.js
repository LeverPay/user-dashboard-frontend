import React from "react";
import "./KYCUpgradeMessages.css";
import Smiley from "../../../assets/images/smiley.png";

export const ReturnMessage = () => {
  return (
    <>
      <div className="kyc-return-message-container">
        <div className="col-md-9">
          {" "}
          <p>
            Hi! <br />
            <span>Goodness Micheal</span> You have Upgraded your card to <br />a
            Gold Card.{" "}
            <span>
              You can Now <br />
              ENJOY Daily spending Limit of 10000 USDT. <br />
            </span>{" "}
            Thank you for Choosing <br />
            LeverPay.
          </p>
        </div>
        <div className="col-md-3">
          <img src={Smiley} alt="smiley" className="col-md-12" />
        </div>
      </div>
    </>
  );
};
