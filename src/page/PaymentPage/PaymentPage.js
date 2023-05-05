import React, { useState } from "react";
// import CreditCard from "./CreditCard/CreditCard";
import "./payment-page.css";
import "react-credit-cards-custom/es/styles-compiled.css";
import { CreditCard } from "./CreditCard/CreditCard";
import LeverpayLogo from "../../assets/images/logo.png";
import InsufficientBalance from "./TransactionMessages/InsufficientBalance";
import EmailMessage from "./TransactionMessages/EmailMessage";
import SuccessMessage from "./TransactionMessages/SuccessMessage";

function PaymentPage() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";
  return (
    <>
      {" "}
      <div className="col-md-12 payment-page-container">
        <div className="col-md-2 logo-holder offset-md-1">
          {" "}
          <img src={LeverpayLogo} alt="" width="100%" />
        </div>
        <div className="tabs  offset-md-1">
          <div
            className={`tab ${checkActive(1, "active2")}`}
            onClick={() => handleClick(1)}
          >
            Credit Card
          </div>
          <div
            className={`tab ${checkActive(2, "active2")}`}
            onClick={() => handleClick(2)}
          >
            Transfer
          </div>
        </div>
        <div className="panels ">
          <div className={`panel ${checkActive(1, "active2")}`}>
            <CreditCard />
          </div>
          <div className={`panel ${checkActive(2, "active2")}`}>
            <EmailMessage />
            <SuccessMessage />
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
