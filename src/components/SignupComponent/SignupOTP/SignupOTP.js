import React from "react";
import LeverpayLogo from "../../../assets/images/LeverpayLogo.png";
import "./SignupOTP.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { verifyEmail, resendVerifyToken } from "../../../services/apiService";
import { ToastContainer, toast } from "react-toastify";

function SignupOTP({ email }) {
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputFour, setInputFour] = useState("");

  const inputRef = React.createRef();

  const emailFromLocalStorage = localStorage.getItem("userEmail");

  const AccountVerify = async () => {
    console.log("API Request");

    toast.loading("Verifying");

    const verifyData = {
      email: emailFromLocalStorage,
      token: `${inputOne}${inputTwo}${inputThree}${inputFour}`,
    };

    const response = await verifyEmail(verifyData);

    toast.dismiss();

    console.log("response", response);

    if (response.success) {
      toast.success("Email Verified");
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } else {
      toast.error(response.message);
    }
  };

  const resendToken = async () => {
    // const email = localStorage.getItem("userEmail");
    toast.loading("Sending OTP");

    const response = await resendVerifyToken({ email: emailFromLocalStorage });

    toast.dismiss();

    toast.success("OTP Sent");
  };

  return (
    <section id="verify_email">
      <div className="logo-container">
        <img src={LeverpayLogo} alt="" className="signup-otp-logo" />
      </div>
      <div className="signup-otp-container">
        <div className="signup-otp-row">
          <p className="verify-message">Please verify your Account</p>
          <span> A code has been sent to {emailFromLocalStorage}</span>
        </div>
        <div className="otp-input-container">
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputOne}
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            maxLength={1}
            onChange={
              (e) => setInputOne(e.target.value)
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputTwo}
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            maxLength={1}
            onChange={
              (e) => setInputTwo(e.target.value)
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputThree}
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            maxLength={1}
            onChange={
              (e) => setInputThree(e.target.value)
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputFour}
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            maxLength={1}
            onChange={
              (e) => setInputFour(e.target.value)
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
        </div>
        <br />
        <p className="code-notify">
          Didn't get the code?{" "}
          <button onClick={resendToken}>Click to resend</button>
        </p>

        <Button
          variant="primary"
          type="submit"
          className="verify-btn"
          disabled={!inputOne || !inputTwo || !inputThree || !inputFour}
          onClick={AccountVerify}
        >
          Verify Account
        </Button>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignupOTP;
