import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import OTPLogo from "../../assets/images/otp.png";
import Cancel from "../../assets/images/cancel.png";
import "./TransferOTP.css";
import { resendVerifyToken } from "../../services/apiService";
import { toast } from "react-toastify";
import { useLocalState } from "../../utils/useLocalStorage";
import { verifytransferOtp } from "../../services/transferService";

const TransferPaymentComp = () => {
  const [otp, setOtp] = useState("");
  const [uuid, setUuid] = useState(null); // State to store UUID
  const [email, setEmail] = useState(""); // State to store email

  const [jwt] = useLocalState("", "jwt");

  const navigate = useNavigate();
  const inputRef = React.createRef();

  const resendFn = async () => {
    // Solving
    // Ensure email is available before calling resendVerifyToken
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }

    toast.loading("Resending OTP...");

    try {
      const response = await resendVerifyToken(email);
      toast.dismiss();

      if (response.success) {
        toast.success("OTP has been resent to your email.");
      } else {
        toast.error(response.message || "Failed to resend OTP.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred while resending OTP.");
      console.error("Resend OTP Error:", error);
    }
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const transferData = localStorage.getItem("transferData");
    const userJson = localStorage.getItem("user");

    if (transferData && userJson) {
      const data = JSON.parse(transferData);
      const userData = JSON.parse(userJson);

      setUuid(data.uuid);
      setEmail(userData.email);
    } else {
      // Handle the case where no data is available in localStorage
      toast.error("No transfer data found. Please try again.");
      navigate(-1); // Navigate back if no data is found
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    if (otp.length > 4) {
      return;
    } else {
      setOtp(e.target.value.replace(/\D/g, ""));
    }
  };

  const handleOTP = async () => {
    if (!uuid) {
      toast.error("UUID not found. Cannot verify OTP.");
      return;
    }

    toast.loading("Verifying...");

    try {
      const response = await verifytransferOtp({ uuid, otp }, jwt);

      toast.dismiss();

      if (response.success) {
        navigate("/transfer-payment-confirmation", {
          state: { success: true, },
        });
      } else {
        navigate("/transfer-payment-confirmation", {
          state: {
            success: false,
          },
        });
      }
    } catch (error) {
      toast.dismiss();
      navigate("/transfer-payment-confirmation", {
        state: {
          success: false,
          message: "An error occurred while verifying OTP.",
        },
      });
    }
  };

  return (
    <div className="transfer-payment-component">
      <div className="otp_section">
        <img src={OTPLogo} alt="" className="phone-otp" />

        <p className="otp-message">Kindly Enter the OTP sent to {email}</p>
        <div className="otp-field">
          <Form.Control
            type="text"
            className="otp-input"
            value={otp}
            name="transfer_otp"
            ref={inputRef}
            placeholder="Enter OTP"
            maxLength={4}
            onChange={handleInputChange}
            required
          />

          <Button
            type="button"
            className="auth-btn"
            onClick={handleOTP}
            disabled={otp.length === 4 ? false : true}
          >
            Authorize
          </Button>
        </div>

        <p className="otp-resend-msg">
          Didn't get a code?{" "}
          <span onClick={resendFn} className="color-link pointer">
            click to resend
          </span>
        </p>

        <Button
          type="button"
          className="transfer-cancel-payment"
          onClick={() => navigate(-1)}
        >
          <img src={Cancel} alt="" className="cancel-sign" />
          &nbsp; Cancel Payment
        </Button>
      </div>
    </div>
  );
};

export default TransferPaymentComp;
