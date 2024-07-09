import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import Logo from "../../assets/images/half-logo.png";
import OTPLogo from "../../assets/images/otp.png";
import Cancel from "../../assets/images/cancel.png";
import Padlock from "../../assets/images/padlock.png";
import Swal from "sweetalert2";
import "./TransferOTP.css";
import { verifyPayInvoice } from "../../services/apiService";
import { toast } from "react-toastify";

const TransferOTP = ({ show, setShow, email, amount, resendFn, id }) => {
  const inputRef = React.createRef();
  const [transferOTP, setTransferOTP] = useState("");

  const handleClose = () => setShow(false);

  const handleInputChange = (e) => {
    if (transferOTP.length > 4) {
      return;
    } else {
      setTransferOTP(e.target.value.replace(/\D/g, ""));
    }
  };

  const handleOTP = async (otp) => {
    //If the balance is enough continue with paying the invoice
    toast.loading("Verifying...");

    const response = await verifyPayInvoice({ id, otp });

    toast.dismiss();

    if (response.success) {
      Swal.fire({
        title: "Success",
        text: `₦${amount} has been transferred successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
      setShow(false);
    } else {
      // Handle validation errors returned from the backend
      toast.dismiss();
      toast.error(response.message || "OTP failed");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <img src={Logo} alt="hello" className="otp-logo" />
          <p>
            {email} <br />
            <span className="modal_pay">
              Pay <span className="modal_header_amount">&#8358;{amount}</span>
            </span>
          </p>
        </Modal.Header>
        <Modal.Body>
          <img src={OTPLogo} alt="" className="phone-otp" />

          <p className="otp-message">Kindly Enter the OTP sent to {email}</p>
          <div className="otp-field">
            <Form.Control
              type="text"
              className="otp-input"
              value={transferOTP}
              name="transfer_otp"
              ref={inputRef}
              placeholder="Enter OTP"
              maxLength={4}
              onChange={handleInputChange}
              required
            />

            <Button
              type="submit"
              className="auth-btn"
              onClick={() => handleOTP(transferOTP)}
              disabled={transferOTP.length === 4 ? false : true}
            >
              AUTHORIZE
            </Button>
          </div>

          <p className="otp-message">
            A Token should be sent to you within 5 minutes
          </p>

          <p className="otp-resend-msg">
            Didn't get a code?{" "}
            <span onClick={resendFn} className="color-link pointer">
              click to resend
            </span>
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
          <img src={Padlock} alt="" style={{ height: "18px" }} />
          <small className="footer-style">
            Secured by <big className="color-link font-style">LeverPay</big>
          </small>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransferOTP;
