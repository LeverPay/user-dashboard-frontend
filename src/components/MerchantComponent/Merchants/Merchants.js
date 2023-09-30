import React from "react";
import Verified from "../../../assets/images/blue-check.png";

import "./Merchants.css";
function Merchants(props) {
  return (
    <div className="col-md-12 merchants-container">
      <div className="merchant-logo">
        <img
          className="mer_logos col-md-2 logo-1"
          src={props.logo2}
          alt="verified"
        />
        <img
          className="mer_logos col-md-2 logo-2"
          src={props.logo1}
          alt="verified"
        />
      </div>

      <div className="verified">
        <h4>Verified</h4>
      </div>
    </div>
  );
}

export default Merchants;
