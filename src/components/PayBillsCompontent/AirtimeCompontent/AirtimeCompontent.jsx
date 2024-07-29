import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AirtimeComponent.module.css";
import mtnLogo from "../../../assets/mtn.png";
import airtelLogo from "../../../assets/airtel.jpeg";
import gloLogo from "../../../assets/glo.jpeg";
import nineMobileLogo from "../../../assets/9mobile.webp";
import { detectNetwork, useLocalState } from "../../../utils/useLocalStorage";
import { getBillerPaymentItemsByAmount } from "../../../services/apiService";
import LoadingScreen from "../../LoadingPage/LoadingScreen";

const networkDetails = {
  MTN: { logo: mtnLogo, billerId: 348 },
  Airtel: { logo: airtelLogo, billerId: 2774 },
  Glo: { logo: gloLogo, billerId: 3070 },
  "9mobile": { logo: nineMobileLogo, billerId: 205 },
};

const AirtimeComponent = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useLocalState("savedPhoneNumber", "");
  const [amount, setAmount] = useState("");
  const [saveNumber, setSaveNumber] = useState(!!phoneNumber);
  const [balance, setBalance] = useState(1000);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [amountErrorMessage, setAmountErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [user, setUser] = useLocalState("", "user");

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

  const handleSaveNumberChange = (e) => setSaveNumber(e.target.checked);

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

        const data = await getBillerPaymentItemsByAmount(
          jwt,
          billerId,
          amountNum
        );
        console.log(data);

        const customerEmail = localStorage.getItem("userEmail");
        const customerMobile = localStorage.getItem("userPhoneNumber");

        localStorage.setItem(
          "billerData",
          JSON.stringify({
            customerId: phoneNumber,
            amount: `${amountNum}`,
            paymentCode: data.paymentCode,
            itemName: data.itemName,
            billerName: data.billerName,
            billerCategoryId: data.billerCategoryId,
            customerEmail,
            customerMobile,
            refrenceNo: data.referenceNo,
          })
        );

        setBalance(balance - amountNum);
        navigate("/pin");
      } catch (error) {
        console.error("Error fetching biller payment items:", error);
        setAmountErrorMessage("Failed to process request. Please try again.");
      } finally {
        setLoading(false);
      }
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
          <h2 className={style.modalTitle}>Airtime Purchase</h2>
          <div className={style.networksRow}>
            {Object.keys(networkDetails).map((key) => (
              <img
                key={key}
                src={networkDetails[key].logo}
                alt={`${key} logo`}
                className={`${style.networkLogo} ${
                  network && network.name === key ? style.selected : ""
                }`}
                onClick={() =>
                  setNetwork({
                    name: key,
                    biller_id: networkDetails[key].billerId,
                  })
                }
              />
            ))}
          </div>
          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Receiver Phone Number</h1>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className={style.input}
              placeholder="Enter phone number"
            />
            {phoneErrorMessage && (
              <p className={style.errorMessage}>{phoneErrorMessage}</p>
            )}
          </div>
          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Airtime Amount (Naira)</h1>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className={style.input}
              placeholder="Enter amount"
            />
            {amountErrorMessage && (
              <p className={style.errorMessage}>{amountErrorMessage}</p>
            )}
          </div>
          <div className={style.formGroupCheckbox}>
            <input
              type="checkbox"
              id="saveNumber"
              checked={saveNumber}
              onChange={handleSaveNumberChange}
            />
            <p className={style.formLabelCheckbox}>
              Save this number for future transactions
            </p>
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
      )}
    </div>
  );
};

export default AirtimeComponent;
