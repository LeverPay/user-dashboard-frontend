import React from "react";
import LeverpayLogo from "../../../assets/images/LeverpayLogo.png";
import "./SignupOTP.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { verifyEmail } from "../../../services/apiService";

function SignupOTP({ email }) {
  console.log(email);

  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputFour, setInputFour] = useState("");

  const inputRef = React.createRef();

  const emailFromLocalStorage = localStorage.getItem("userEmail");

  const AccountVerify = () => {
    console.log("API Request");

    const verifyData = {
      email: emailFromLocalStorage,
      token: `${inputOne}${inputTwo}${inputThree}${inputFour}`,
    };

    verifyEmail(verifyData);
  };

  return (
    <>
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
            name="first_name"
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            onChange={
              (e) => setInputOne(e.target.value.replace(/\D/g, ""))
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputTwo}
            name="first_name"
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            onChange={
              (e) => setInputTwo(e.target.value.replace(/\D/g, ""))
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputThree}
            name="first_name"
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            onChange={
              (e) => setInputThree(e.target.value.replace(/\D/g, ""))
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
          <Form.Control
            type="text"
            className="otp-input-value"
            value={inputFour}
            name="first_name"
            ref={inputRef}
            placeholder=""
            pattern="[A-Za-z]{1}"
            title="Please enter only one digit"
            onChange={
              (e) => setInputFour(e.target.value.replace(/\D/g, ""))
              // setFirstName(e.target.value.replace(/\D/g, ""))
            }
            required
          />
        </div>
        <br />
        <p className="code-notify">
          Didn't get the code? <em>Click to resend</em>
        </p>

        <Button
          variant="primary"
          type="submit"
          className="signup-btn"
          disabled={
            inputOne && inputTwo && inputThree && inputFour ? false : true
          }
          onClick={AccountVerify}
        >
          Verify Account
        </Button>
      </div>
    </>
  );
}

export default SignupOTP;
