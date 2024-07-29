import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLocalState } from "../../../utils/useLocalStorage";
import { submitBillPayment } from "../../../services/apiService";
import LoadingScreen from "../../LoadingPage/LoadingScreen";
import style from "./AirtimeComponent.module.css";

const AirTimeComponentPin = () => {
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [saveNumber, setSaveNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jwt] = useLocalState("", "jwt");

  useEffect(() => {
    // Fetch data from localStorage
    const billerData = JSON.parse(localStorage.getItem("billerData"));
    if (billerData) {
      setPhoneNumber(billerData.customerId);
      setAmount(billerData.amount);
      setSaveNumber(billerData.saveNumber);
    }
  }, []);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPin(value);
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
    try {
      const billerData = JSON.parse(localStorage.getItem("billerData"));
      if (!billerData) {
        throw new Error("Biller data not found.");
      }

      setLoading(true);
      const response = await submitBillPayment(
        {
          ...billerData,
          pin,
        },
        jwt
      );
      console.log("Payment successful:", response);

      // Remove billerData from localStorage upon successful payment
      localStorage.removeItem("billerData");

      navigate("/success");
    } catch (error) {
      console.error("Error submitting payment:", error);
      setPinErrorMessage("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={style.mainDiv}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <h2 className={style.modalTitle}>Airtime</h2>
          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Phone Number</h1>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              readOnly
              className={style.input}
            />
          </div>
          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Amount</h1>
            <input
              type="text"
              id="amount"
              value={`NGN ${amount}`}
              readOnly
              className={style.input}
              aria-label="Amount"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.formGroup}>
              <h1 className={style.formLabel}>Transaction Pin</h1>
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter Pin"
                className={style.input}
                maxLength={4}
                aria-label="Transaction Pin"
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
          </form>
          <div className={style.buttonGroup}>
            <button
              type="button"
              className={style.buttonSubmit}
              onClick={handleSubmit}
            >
              Confirm
            </button>
            <button
              type="button"
              className={style.buttonCancel}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AirTimeComponentPin;
