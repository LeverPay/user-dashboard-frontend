import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaChevronLeft } from "react-icons/fa";
import { useLocalState } from "../../../utils/useLocalStorage";
import { submitBillPayment } from "../../../services/apiService";
import SuccessScreen from "../../reuseableComponents/LoadingPage/SuccessfullScreen"; // Ensure this is imported correctly
import style from "../AirtimeCompontent/AirtimeComponent.module.css";
import ResetPaymentScreen from "../../reuseableComponents/resetPasswordComponent/ResetPaymentScreen";

const DataPaymentComponent = () => {
  const [loadingText, setLoadingText] = useState("Proceed");
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [itemName, setItemName] = useState(""); // New state for item name
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
    const selectedDataPlan = JSON.parse(
      localStorage.getItem("selectedDataPlan")
    ); // Retrieve selected data plan
    if (billerData && selectedDataPlan) {
      setPhoneNumber(billerData.customerId);
      setAmount(billerData.amount);
      setItemName(selectedDataPlan.Name); // Set item name
      setSaveNumber(billerData.saveNumber);
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

  const handleSaveNumberChange = () => setSaveNumber(!saveNumber);

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
      console.log("Payment successful:", response.data);
  
      localStorage.removeItem("billerData");
      setPaymentSuccess(true); // Show the SuccessScreen component
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
   {paymentSuccess && <SuccessScreen />}
          <div className={style.header}>
            <FaChevronLeft
              className={style.cancelIcon}
              onClick={() => navigate(-1)}
            />
            <h2 className={style.modalTitle}>Data</h2>
          </div>
          <div className={style.background}>
            <div className={style.bundle}>
              <h1>Bundle Details</h1>
              <div className={style.bundleDetails}>
                <div className={style.detail}>
                  <p>Selected Plan: {itemName}</p>
                </div>
              </div>
            </div>
            <div className={style.formGroup}>
              <h1 className={style.formLabel}>Purchasing for</h1>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                readOnly
                className={style.input}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.formGroup}>
                <h1 className={style.formLabel}>Transaction Pin</h1>
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
              <div className={style.formGroupCheckbox}>
                <label className={style.switch}>
                  <input
                    type="checkbox"
                    checked={saveNumber}
                    onChange={handleSaveNumberChange}
                  />
                  <span
                    className={`${style.slider} ${
                      saveNumber ? style.activeSlider : ""
                    }`}
                  ></span>
                </label>
              </div>
              <p
                className={`${style.formLabelCheckbox} ${
                  saveNumber ? style.activeText : ""
                }`}
              >
                Auto Renew
              </p>
              <ResetPaymentScreen />
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

export default DataPaymentComponent;
