import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaChevronLeft } from "react-icons/fa";
import { useLocalState } from "../../../utils/useLocalStorage";
import { submitBillPayment } from "../../../services/apiService";
import SuccessScreen from "../../reuseableComponents/LoadingPage/SuccessfullScreen";
import style from "./AirtimeComponent.module.css";
import group from "../../../assets/Group.png";

const AirTimeComponentPin = () => {
  const [loadingText, setLoadingText] = useState("Proceed");
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [saveNumber, setSaveNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  const navigate = useNavigate();
  const [jwt] = useLocalState("", "jwt");

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setLoadingText((prev) =>
          prev.endsWith(".....") ? "Proceed" : `${prev}.`
        );
      }, 200);
    } else {
      setLoadingText("Proceed");
    }

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    const billerData = JSON.parse(localStorage.getItem("billerData"));
    if (billerData) {
      setPhoneNumber(billerData.customerId);
      setAmount(billerData.amount);
      setSaveNumber(billerData.saveNumber);
    } else {
      navigate(-1); // Navigate back if billerData is not found
    }
  }, [navigate]);

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
  
      console.log("Submitting with data:", { ...billerData, pin });
  
      const response = await submitBillPayment(
        {
          ...billerData,
          pin,
        },
        jwt
      );
      console.log("Payment successful:", response);
  
      localStorage.removeItem("billerData");
      setPaymentSuccess(true); // Show the SuccessScreen component
    } catch (error) {
      console.error("Error submitting payment:", error);
      if (error.response && error.response.data) {
        console.error("Error response from server:", error.response.data);
        setPinErrorMessage(error.response.data); // Capture error message from response
      } else {
        setPinErrorMessage("Failed to process payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={style.mainDiv}>
      {paymentSuccess && <SuccessScreen />} {/* Conditionally render SuccessScreen */}
      <div className={style.header}>
        <FaChevronLeft
          className={style.cancelIcon}
          onClick={() => navigate(-1)}
        />
        <h2 className={style.modalTitle}>Airtime</h2>
      </div>
      <div className={style.background}>
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
            <h1 className={style.formLabel}>Transaction PIN</h1>
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
          <div className={style.buttonGroup}>
            <button
              type="submit"
              className={style.buttonSubmit}
              disabled={loading}
            >
              {loading ? loadingText : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AirTimeComponentPin;
