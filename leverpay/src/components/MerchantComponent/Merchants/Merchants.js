import React from "react";
import Verified from "../../../assets/images/verified.png";

import "./Merchants.css";
function Merchants(props) {
  return (
    <div className="col-md-12 merchants-container">
      <div className="merchant-logo">
        <img
          className="col-md-2 logo-1"
          src={props.logo2}
          alt="verified"
          width="100%"
        />
        <img
          className="col-md-2 logo-2"
          src={props.logo1}
          alt="verified"
          width="100%"
        />
      </div>

      <div className="verified">
        <img
          className="col-md-12 "
          src={Verified}
          alt="verified"
          width="100%"
        />
        <h4>Verified</h4>
      </div>
    </div>
  );
}

export default Merchants;
