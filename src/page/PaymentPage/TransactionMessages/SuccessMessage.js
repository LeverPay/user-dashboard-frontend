import React from "react";
import Logo from "../../../assets/images/half-logo.png";
import UploadCheckmark from "../../../components/FileUpload/UploadCheckmark";
import SuccessCheckmark from "./SuccessCheckmark";
import Padlock from "../../../assets/images/padlock.png";
import { Link, NavLink } from "react-router-dom";

function SuccessMessage() {
  return (
    <>
      <div className="success-message-div">
        <div className="success-header flexy flexyM">
          <div className="header-logo">
            {" "}
            <img src={Logo} alt="" />
          </div>
          <div>
            <small>Musaabdullahi001@gmail.com</small>
            <p style={{ color: "#172C63" }}>
              {" "}
              Pay{" "}
              <span style={{ color: "#186317", fontSize: "24px" }}>
                $100.000
              </span>
            </p>
          </div>
        </div>
        <div className="payment-mode">
          <center>
            {" "}
            <h4>PAID WITH CARD</h4>
          </center>
        </div>
        <center>
          <div className="col-md-5 checkmark-div">
            <div className=" check-div">
              {" "}
              <center>
                {" "}
                <SuccessCheckmark />
              </center>
            </div>
          </div>
        </center>
        <center>
          {" "}
          <h1>
            Payment <br />
            Successful
          </h1>
          <p style={{ color: "#979797", fontFamily: "MontserratB" }}>
            Your Transaction reference is
            <br />
            <span> Xklikhsah</span>
          </p>
        </center>
        <div className="flexy flexyM" style={{ marginTop: "100px" }}>
          <p style={{ fontFamily: "MontserratB", flexGrow: "1" }}>
            {" "}
            <img
              src={Padlock}
              alt=""
              width="4%"
              style={{ marginRight: "10px", marginTop: "-4px" }}
            />
            Secured by <span style={{ color: "#082E88" }}>LeverPay</span>
          </p>
          <Link className="blue-link">Feedback</Link>
        </div>
      </div>
    </>
  );
}

export default SuccessMessage;
