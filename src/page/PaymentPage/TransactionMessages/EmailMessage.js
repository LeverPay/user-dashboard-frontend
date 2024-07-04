import "./transaction-messages.css";
import Logo from "../../../assets/images/LeverpayLogo.png";
import Twitter from "../../../assets/images/twitter.png";
import Telegram from "../../../assets/images/telegram.png";
import Facebook from "../../../assets/images/facebook.png";
import Youtube from "../../../assets/images/youtube.png";
import Discord from "../../../assets/images/discord.png";
import Instagram from "../../../assets/images/instagram.png";
import LinkedIn from "../../../assets/images/linkedIn.png";
import React from "react";
import { Link } from "react-router-dom";
import Padlock from "../../../assets/images/padlock.png";

function EmailMessage() {
  return (
    <div className="email-message ">
      <div className="email-header">
        <center>
          {" "}
          <img src={Logo} alt="" />
        </center>
      </div>
      <div className="mail-body">
        <h3>[Leverpay] Verification Code</h3>
        <p>
          Your Verification Code:
          <br />
          <br />
          <span style={{ fontSize: "22px", color: "#CD4729" }}>
            327301
          </span>{" "}
        </p>
        <p>
          <em>
            {" "}
            The verification code will be valid for 30 minutes. Please do not
            share this code with anyone. Don’t recognize this activity? Please{" "}
            <Link className="mail-link">reset your password</Link> and contact{" "}
            <Link className="mail-link">Customer support</Link> Immediately.
          </em>
        </p>
        <br />
        <br />
        <p style={{ color: "#CD4729" }}>
          <em> This is an Automated message ,Please do not reply.</em>
        </p>
        <hr />
      </div>
      <center style={{ marginBottom: "50px" }}>
        <h6 style={{ fontFamily: "MontserratB", color: "#cd4729" }}>
          Stay Connected!
        </h6>
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={Twitter} alt="" />
            </Link>
          </li>{" "}
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={Telegram} alt="" />
            </Link>
          </li>{" "}
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={Facebook} alt="" />
            </Link>
          </li>{" "}
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={Youtube} alt="" />
            </Link>
          </li>{" "}
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={Discord} alt="" />
            </Link>
          </li>{" "}
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={Instagram} alt="" />
            </Link>
          </li>{" "}
          <li className="list-inline-item">
            {" "}
            <Link>
              {" "}
              <img src={LinkedIn} alt="" />
            </Link>
          </li>
        </ul>
      </center>
      <center>
        {" "}
        <p style={{ fontFamily: "MontserratB" }}>
          {" "}
          <img
            src={Padlock}
            alt=""
            width="4%"
            style={{ marginRight: "10px", marginTop: "-4px" }}
          />
          Secured by <span style={{ color: "#082E88" }}>LeverPay</span>
        </p>
      </center>
    </div>
  );
}

export default EmailMessage;
