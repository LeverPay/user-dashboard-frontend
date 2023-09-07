import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Logo from "../../assets/images/half-logo.png";
import Cancel from "../../assets/images/cancel.png";
import Swal from "sweetalert2";
import "./PrimaryNumberComponent.css";

const PrimaryNumberComponent = ({ show, setShow }) => {
  const inputRef = React.createRef();

  const [otpOne, setOtpOne] = useState("");
  const [otpTwo, setOtpTwo] = useState("");
  const [otpThree, setOtpThree] = useState("");
  const [otpFour, setOtpFour] = useState("");

  // alert(inputRef);

  const handleClose = () => {
    setShow(false);
  };

  const primaryEmailOTP = () => {
    Swal.fire({
      icon: "success",
      title: "Verification Successful",
      text: "you can change your phone number in 72 hours",
      timer: 5000,
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <div className="header-images">
            <img src={Logo} alt="hello" className="otp-logo" />
            <img
              src={Cancel}
              alt="hello"
              className="cancel-img"
              onClick={() => setShow(false)}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className="verify-note">Primary phone number verification</p>

          <p className="otp-note">
            Please enter the OTP code that was sent to your number
          </p>
          <div className="otp-fields">
            <Form.Control
              type="text"
              className="otp-textbox"
              value={otpOne}
              name="transfer_otp"
              ref={inputRef}
              onChange={(e) => setOtpOne(e.target.value.replace(/\D/g, ""))}
              required
            />
            <Form.Control
              type="text"
              className="otp-textbox"
              value={otpTwo}
              name="transfer_otp"
              ref={inputRef}
              onChange={(e) => setOtpTwo(e.target.value.replace(/\D/g, ""))}
              required
            />
            <Form.Control
              type="text"
              className="otp-textbox"
              value={otpThree}
              ref={inputRef}
              onChange={(e) => setOtpThree(e.target.value.replace(/\D/g, ""))}
              required
            />
            <Form.Control
              type="text"
              className="otp-textbox"
              value={otpFour}
              name="transfer_otp"
              ref={inputRef}
              onChange={(e) => setOtpFour(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
          <Button
            type="submit"
            className="verify-btn"
            onClick={primaryEmailOTP}
            // disabled={transferOTP ? false : true}
          >
            Verify Number
          </Button>

          <p className="otp-resend">
            Didn't get a code?{" "}
            <span className="color-link pointer">click to resend</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* <img src={Padlock} alt="" style={{ height: "18px" }} /> */}
          <small className="footer-style">
            Secured by <big className="color-link font-style">LeverPay</big>
          </small>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrimaryNumberComponent;
