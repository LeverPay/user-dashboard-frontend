import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaChevronLeft } from "react-icons/fa";
import { useLocalState } from "../../../utils/useLocalStorage";
import { submitBillPayment } from "../../../services/apiService";
import SuccessScreen from "../../reuseableComponents/LoadingPage/SuccessfullScreen";
import style from "./CableTvComponent.module.css";

const CableTvPaymentScreenComponent = () => {
  const [loadingText, setLoadingText] = useState("Proceed");
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [saveNumber, setSaveNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [billerData, setBillerData] = useState(null); // State for storing billerData
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
    const storedBillerData = JSON.parse(localStorage.getItem("billerData"));
    if (storedBillerData) {
      setBillerData(storedBillerData); // Store billerData in state
      setPhoneNumber(storedBillerData.customerId);
      setAmount(storedBillerData.amount);
      setSaveNumber(storedBillerData.saveNumber);
    } else {
      navigate(-1);
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
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Error submitting payment:", error);
      if (error.response && error.response.data) {
        console.error("Error response from server:", error.response.data);
        setPinErrorMessage(error.response.data);
      } else {
        setPinErrorMessage("Failed to process payment. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.mainDiv}>
      {paymentSuccess && <SuccessScreen />}{" "}
      {/* Conditionally render SuccessScreen */}
      <div className={style.header}>
        <FaChevronLeft
          className={style.cancelIcon}
          onClick={() => navigate(-1)}
        />
        <h2 className={style.modalTitle}>Cable Tv</h2>
      </div>
      <div className={style.backup}>
      <div className={style.formGroup}>
  <h2 className={style.formlabel1}>Summary Details</h2>
  <table className={style.infoTable}>
    <tbody>
      <tr>
        <td className={style.groupP}>Provider:</td>
        <td className={style.billerData}>{billerData?.providerName}</td>
      </tr>
      <tr>
        <td className={style.groupP}>Package:</td>
        <td className={style.billerData}>{billerData?.packageName}</td>
      </tr>
      <tr>
        <td className={style.groupP}>Customer Name:</td>
        <td className={style.billerData}>{billerData?.customerName}</td>
      </tr>
      <tr>
        <td className={style.groupP}>Email:</td>
        <td className={style.billerData}>{billerData?.customerEmail}</td>
      </tr>
      <tr>
        <td className={style.groupP}>Smart Card Number:</td>
        <td className={style.billerData}>{billerData?.smartCardNumber}</td>
      </tr>
      <tr>
        <td className={style.groupP}>Amount:</td>
        <td className={style.billerData}>{billerData?.amount}</td>
      </tr>
    </tbody>
  </table>
  <div className={style.tableLine}></div>
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

export default CableTvPaymentScreenComponent;
