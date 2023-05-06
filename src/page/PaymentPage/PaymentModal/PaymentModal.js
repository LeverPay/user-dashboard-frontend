import React, { useState } from "react";
import Slider from "react-slider-modal";
import "animate.css/animate.min.css";
import Logo from "../../../assets/images/half-logo.png";
import OTP from "../../../assets/images/otp.png";
import Cancel from "../../../assets/images/cancel.png";
import Padlock from "../../../assets/images/padlock.png";
import "./payment-modal.css";
import { Link, NavLink } from "react-router-dom";
import InsufficientBalance from "../TransactionMessages/Transaction-report";

export default function PaymentModal() {
  const [slideShow, setSlideShow] = useState(false);
  const [value, setValue] = useState("");

  const [message, setMessage] = useState("");
  const isAnonymous = true;

  const handleClick = (event) => {
    event.currentTarget.disabled = true;
    console.log("button clicked");
  };
  const htmlData = () => {
    return (
      <>
        <div className="slider-container">
          <div className="sliderBody">
            <div className="modal-top col-md-1 flexy flexyM">
              {" "}
              <div className="logo-pen">
                {" "}
                <img src={Logo} alt="" />
              </div>
              <div>
                <small>Musaabdullahi001@gmail.com</small>
                <h6>
                  {" "}
                  Pay <span>$100.000</span>
                </h6>
              </div>
            </div>
            <center>
              <div className="modal-main col-md-12">
                <div className="otp-div ">
                  {" "}
                  <img src={OTP} alt="" width="25%" />
                  <br />
                  <br />
                  <p>
                    Kindly Enter the OTP sent to
                    <br /> <span>*******6383 </span>and <br />
                    <span> Musaabdullahioo1@gmail.com</span>
                  </p>
                </div>
                <div className="" style={{ marginTop: "40px" }}>
                  {/* <button className="otp-btn">327301</button> */}
                  <form className="col-md-12 otp-btn flex flexy">
                    <input
                      type="text"
                      className=" "
                      placeholder="327301"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    />

                    <InsufficientBalance disabled={!message} />
                    {/* AUTHORIZE */}
                  </form>
                </div>

                <p>
                  A Token should be sent to you <br /> within 5 minutes
                </p>
                <br />
                <p>
                  Don’t get a code?
                  <Link to={"/"} className="blue-link">
                    {" "}
                    click to resend
                  </Link>
                </p>
                <button
                  className="btn-cancel"
                  onClick={() => setSlideShow(false)}
                >
                  <img src={Cancel} alt="" width="7%" /> Cancel Payment
                </button>
                <p>
                  {" "}
                  <img
                    src={Padlock}
                    alt=""
                    width="4%"
                    style={{ marginRight: "10px", marginTop: "-4px" }}
                  />
                  <span style={{ color: "#000000" }}> Secured by</span> LeverPay
                </p>
              </div>
            </center>
          </div>
          <div className="sliderFooter">
            {/* <button
              className="btn btn-primary"
              onClick={() => setSlideShow(false)}
            >
              Cancel
            </button> */}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <button
        onClick={() => {
          setSlideShow(!slideShow);
        }}
        className="pay-btn"
      >
        Pay Now
      </button>
      <Slider
        id="demoID2"
        animation="zoom"
        speed="fast"
        closeIcon={(e) => {
          setSlideShow(e);
        }}
        toggle={slideShow}
        sliderStyle={{
          width: "500px",
          height: "90%",
          top: "50px",
        }}
        closeModal={() => {
          setSlideShow(false);
        }}
        direction="bottom"
        render={htmlData()}
      />
    </>
  );
}
