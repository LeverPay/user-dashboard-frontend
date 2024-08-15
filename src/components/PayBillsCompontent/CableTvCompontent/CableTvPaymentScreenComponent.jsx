import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import style from "./CableTvComponent.module.css";
import { useLocalState } from "../../../utils/useLocalStorage";
import { submitBillPayment } from "../../../services/apiService";
import LoadingScreen from "../../reuseableComponents/LoadingPage/LoadingScreen";
// import SuccessfulScreen from "../../reuseableComponents/LoadingPage/SuccessScreen";
import ResetPAYMENTScreen from "../../reuseableComponents/resetPasswordComponent/ResetPaymentScreen";

const CableTvPaymentScreenComponent = () => {
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [saveNumber, setSaveNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State to handle success screen visibility
  const navigate = useNavigate();
  const [jwt] = useLocalState("", "jwt");

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPin(value);
      setPinErrorMessage("");
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin === "") {
      setPinErrorMessage("PIN cannot be empty.");
      return;
    }
    if (pin.length !== 4) {
      setPinErrorMessage("PIN must be exactly 4 digits.");
      return;
    }
    setLoading(true);
    try {
      const billerData = JSON.parse(localStorage.getItem("billerData"));
      if (!billerData) {
        throw new Error("Biller data not found.");
      }
      const response = await submitBillPayment(
        {
          ...billerData,
          pin,
        },
        jwt
      );
      console.log("Payment successful:", response);

      localStorage.removeItem("billerData");
      setSuccess(true); // Show success screen
    } catch (error) {
      console.error("Error submitting payment:", error);
      if (error.response && error.response.data) {
        setPinErrorMessage(error.response.data); // Capture error message from response
      } else {
        setPinErrorMessage("Failed to process payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={style.main}>
      <div className={style.header}>
        <FaChevronLeft
          className={style.cancelIcon}
          onClick={() => navigate(-1)}
        />
        <h2 className={style.modalTitle}>Cable Tv</h2>
      </div>

      <div className={style.summeryDiv}></div>

      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <h1 className={style.formLabel}>Enter your transaction PIN</h1>
          <input
            type={showPin ? "text" : "password"}
            value={pin}
            onChange={handlePinChange}
            placeholder="Enter PIN"
            className={style.input}
            maxLength={4}
            aria-label="Transaction PIN"
          />
          <span className={style.eyeIcon} onClick={toggleShowPin}>
            <div className={style.eyeIcon2}>
              {showPin ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </span>
        </div>
        {pinErrorMessage && (
          <p className={style.errorMessage}>{pinErrorMessage}</p>
        )}

        <ResetPAYMENTScreen />
        <div className={style.buttonGroup}>
          <button
            type="submit"
            className={style.buttonSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CableTvPaymentScreenComponent;
