import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import style from "./AirtimeComponentPin.module.css";
import { detectNetwork, useLocalState } from "../../../utils/useLocalStorage";
import { getBillerPaymentItemsByAmount, submitBillPayment } from "../../../services/apiService";
import LoadingScreen from "../../LoadingPage/LoadingScreen";
import SecuredComponent from "../SecuredLogo/SecuredComponent";



const AirtimeComponentPin = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useLocalState("savedPhoneNumber", "");
  const [amount, setAmount] = useState("");
  const [saveNumber, setSaveNumber] = useState(!!phoneNumber);
  const [balance, setBalance] = useState(1000);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [amountErrorMessage, setAmountErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pinErrorMessage, setPinErrorMessage] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [jwt] = useLocalState("", "jwt");
  const [user] = useLocalState("", "user");

  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);

  useEffect(() => {
    if (phoneNumber) {
      const detectedNetwork = detectNetwork(phoneNumber);
      if (detectedNetwork) {
        setNetwork(detectedNetwork);
      }
    }
  }, [phoneNumber]);

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newPhoneNumber);
    const detectedNetwork = detectNetwork(newPhoneNumber);
    if (detectedNetwork) {
      setNetwork(detectedNetwork);
    }
    setPhoneErrorMessage("");
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value.replace(/\D/g, "");
    setAmount(newAmount);
    setAmountErrorMessage("");
  };

  const handleSaveNumberChange = () => setSaveNumber(!saveNumber);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setPin(value);
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  const handleSubmit = async () => {
    const amountNum = parseFloat(amount);
    let hasError = false;

    if (isNaN(amountNum)) {
      setAmountErrorMessage("Please enter a valid amount.");
      hasError = true;
    } else if (amountNum > user.wallet.withdrawable_amount.ngn) {
      setAmountErrorMessage("Amount entered is greater than balance.");
      hasError = true;
    } else if (amountNum < 50) {
      setAmountErrorMessage("Amount entered cannot be less than 50 Naira.");
      hasError = true;
    } else {
      setAmountErrorMessage("");
    }

    if (phoneNumber.length !== 11) {
      setPhoneErrorMessage("Please enter a valid phone number.");
      hasError = true;
    } else {
      setPhoneErrorMessage("");
    }

    if (!hasError) {
      setLoading(true);
      try {
        if (saveNumber) {
          localStorage.setItem("savedPhoneNumber", phoneNumber);
        } else {
          localStorage.removeItem("savedPhoneNumber");
        }

        if (!network) {
          throw new Error("Invalid network selected.");
        }

        const { biller_id: billerId } = network;
        if (!billerId) {
          throw new Error("Invalid network selected.");
        }

        if (!jwt) {
          throw new Error("JWT token not found.");
        }

        const data = await getBillerPaymentItemsByAmount(jwt, billerId, amountNum);
        console.log(data);

        const customerEmail = localStorage.getItem("userEmail");
        const customerMobile = localStorage.getItem("userPhoneNumber");

        localStorage.setItem("billerData", JSON.stringify({
          customerId: phoneNumber,
          amount: amountNum,
          paymentCode: data.paymentCode,
          itemName: data.itemName,
          billerName: data.billerName,
          billerCategoryId: data.billerCategoryId,
          customerEmail,
          customerMobile,
          referenceNo: data.referenceNo,
        }));

        setBalance(balance - amountNum);
      } catch (error) {
        console.error("Error fetching biller payment items:", error);
        setAmountErrorMessage("Failed to process request. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePinSubmit = async (e) => {
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
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          { !pin ? (
            <>
              <h2 className={style.modalTitle}>Airtime</h2>
              <div className={style.networksRow}>
                {Object.keys(networkDetails).map((key) => (
                  <img
                    key={key}
                    src={networkDetails[key].logo}
                    alt={`${key} logo`}
                    className={`${style.networkLogo} ${
                      network && network.name === key ? style.selected : ""
                    }`}
                    onClick={() => setNetwork({ name: key, biller_id: networkDetails[key].billerId })}
                  />
                ))}
              </div>
              <div className={style.formGroup}>
                <h1 className={style.formLabel}>Phone Number</h1>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  onFocus={() => setPhoneNumberFocused(true)}
                  onBlur={() => setPhoneNumberFocused(phoneNumber !== "")}
                  className={`${style.input} ${phoneNumberFocused || phoneNumber ? style.inputActive : ""}`}
                  placeholder="Enter phone number"
                />
                {phoneErrorMessage && (
                  <p className={style.errorMessage}>{phoneErrorMessage}</p>
                )}
              </div>
              <div className={style.formGroup}>
                <h1 className={style.formLabel}>Amount</h1>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  onFocus={() => setAmountFocused(true)}
                  onBlur={() => setAmountFocused(amount !== "")}
                  className={`${style.input} ${amountFocused || amount ? style.inputActive : ""}`}
                  placeholder="Enter amount"
                />
                {amountErrorMessage && (
                  <p className={style.errorMessage}>{amountErrorMessage}</p>
                )}
              </div>
              <div className={style.buttonGroup}>
                <button
                  type="button"
                  className={style.buttonSubmit}
                  onClick={handleSubmit}
                >
                  Proceed
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
          ) : (
            <div className={style.enterPinDiv}>
              <h2>Enter Pin</h2>
              <form onSubmit={handlePinSubmit}>
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
                <div className={style.buttonGroup}>
                  <button type="submit" className={style.buttonSubmit}>
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
              </form>
            </div>
          )}
          <div>
            <SecuredComponent />
          </div>
        </>
      )}
    </div>
  );
};

export default AirtimeComponentPin;
