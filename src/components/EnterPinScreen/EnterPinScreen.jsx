import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import style from "./EnterPinScreen.module.css";
import SecuredComponent from "../SecuredLogo/SecuredComponent";
import { submitBillPayment } from "../../services/apiService"; 

import { useLocalState } from "../../utils/useLocalStorage";

const EnterPinScreen = () => {
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");

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
    if (pin.length === 4) {
      try {
        const billerData = JSON.parse(localStorage.getItem("billerData"));
        if (!billerData) {
          throw new Error("Biller data not found.");
        }

        const response = await submitBillPayment({
          ...billerData,
          pin,
        }, jwt);
        console.log("Payment successful:", response);

        navigate("/success"); 
      } catch (error) {
        console.error("Error submitting payment:", error);
        setPinErrorMessage("Failed to process payment. Please try again.");
      }
    } else {
      setPinErrorMessage("PIN must be exactly 4 digits.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.h2Tag}>
        <h1>
          Please Enter your Payment PIN to <br />
          Confirm Transaction
        </h1>
      </div>

      <div className={style.enterPinDiv}>
        <h2>Enter Pin</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.pinInputContainer}>
            <input
              type={showPin ? "text" : "password"}
              value={pin}
              onChange={handlePinChange}
              placeholder="Enter PIN"
              className={style.pinInput}
              maxLength={4}
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
      </div>
      <div className={style.buttonGroup}>
        <button type="submit" className={style.buttonSubmit} onClick={handleSubmit}>
          Submit
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={style.buttonCancel}
        >
          Cancel
        </button>
      </div>

      <div className={style.ptag}>
        <p>
          Don’t have a PIN yet? <Link to="/create-pin"><span>Create</span></Link>
        </p>
      </div>
      <div>
        <SecuredComponent />
      </div>
    </div>
  );
};

export default EnterPinScreen;
