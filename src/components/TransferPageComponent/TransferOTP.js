import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import Logo from "../../assets/images/half-logo.png";
import OTPLogo from "../../assets/images/otp.png";
import Cancel from "../../assets/images/cancel.png";
import Padlock from "../../assets/images/padlock.png";
import Swal from "sweetalert2";
import "./TransferOTP.css";

const TransferOTP = ({ show, setShow }) => {
  const inputRef = React.createRef();
  const [transferOTP, setTransferOTP] = useState("");

  const handleClose = () => setShow(false);

  const handleOTP = () => {
    Swal.fire({
      title: "Success",
      text: `$100 has been transferred successfully`,
      icon: "success",
      confirmButtonText: "OK",
    });
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <img src={Logo} alt="hello" className="otp-logo" />
          <p>
            johndoe2023@gmail.com <br />
            <span style={{ float: "right" }}>Send $100.00</span>
          </p>
        </Modal.Header>
        <Modal.Body>
          <img src={OTPLogo} alt="" className="phone-otp" />

          <p className="otp-message">
            Kindly Enter the OTP sent to ********023 and johndoe2023@gmail.com
          </p>
          <div className="otp-field">
            <Form.Control
              type="text"
              className="otp-input"
              value={transferOTP}
              name="transfer_otp"
              ref={inputRef}
              placeholder="Enter OTP"
              onChange={(e) =>
                setTransferOTP(e.target.value.replace(/\D/g, ""))
              }
              required
            />

            <Button
              type="submit"
              className="auth-btn"
              onClick={handleOTP}
              disabled={transferOTP ? false : true}
            >
              AUTHORIZE
            </Button>
          </div>

          <p className="otp-message">
            A Token should be sent to you within 5 minutes
          </p>

          <p className="otp-resend-msg">
            Didn't get a code?{" "}
            <span className="color-link pointer">click to resend</span>
          </p>

          <Button
            type="submit"
            className="cancel-payment"
            onClick={() => setShow(false)}
          >
            <img src={Cancel} alt="" className="cancel-sign" />
            &nbsp; Cancel Payment
          </Button>
        </Modal.Body>
        <Modal.Footer>
          {/* <img src={Padlock} alt="" style={{ height: "18px" }} /> */}
          <small className="footer-style">
            Secured by <big className="color-link font-style">LeverPay</big>
          </small>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransferOTP;
