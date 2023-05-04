import "./transaction-messages.css";
import Logo from "../../../assets/images/LeverpayLogo.png";
import React from "react";

function EmailMessage() {
  return (
    <div className="email-message ">
      <div className="email-header">
        <center>
          {" "}
          <img src={Logo} alt="" />
        </center>
      </div>
      <h2>[Leverpay] Verification Code</h2>
    </div>
  );
}

export default EmailMessage;
