import React, { useState } from "react";
// import CreditCard from "./CreditCard/CreditCard";
import "./payment-page.css";
import "react-credit-cards-custom/es/styles-compiled.css";
import { CreditCard } from "./CreditCard/CreditCard";
import LeverpayLogo from "../../assets/images/logo.png";
import EmailMessage from "./TransactionMessages/EmailMessage";
import SuccessMessage from "./TransactionMessages/SuccessMessage";
import { NavLink, Outlet } from "react-router-dom";


function PaymentPage() {
  return (
      <>
        {" "}
        <center>
          {" "}
          <div className="col-md-3 payment-page-container">
            <div className="col-md-5 logo-holder col-6">
              {" "}
              <img src={LeverpayLogo} alt="" className="pay_logo" />
            </div>
            <nav className="checkoutNav">
              <ul>
                <li>
                  <NavLink activeclassname='active' to='/payment-page/credit-card'>
                    Credit Card
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname='active' to='/payment-page/checkout-transfer'>
                    Transfer
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div>
              <Outlet/>
            </div>
          </div>
        </center>
      </>
  );
}

export default PaymentPage;
