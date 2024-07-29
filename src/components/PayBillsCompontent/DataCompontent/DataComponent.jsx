import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./DataComponent.module.css";
import mtnLogo from "../../../assets/mtn.png";
import airtelLogo from "../../../assets/airtel.jpeg";
import gloLogo from "../../../assets/glo.png";
import nineMobileLogo from "../../../assets/9Mobile.png";
import { detectNetwork, useLocalState } from "../../../utils/useLocalStorage";

const networkLogos = {
  MTN: mtnLogo,
  Airtel: airtelLogo,
  Glo: gloLogo,
  "9mobile": nineMobileLogo,
};

export default function DataComponent() {
  const navigate = useNavigate();
  const [network, setNetwork] = useState("");
  const [phoneNumber, setPhoneNumber] = useLocalState("savedPhoneNumber", "");
  const [dataPlan, setDataPlan] = useState("");
  const [saveNumber, setSaveNumber] = useState(!!phoneNumber);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [dataPlanErrorMessage, setDataPlanErrorMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState("daily");
  const [billerItems, setBillerItems] = useState([]);
  const [dataPrice, setDataPrice] = useState();
  const [inputBorderColor, setInputBorderColor] = useState("#ccc"); // Default border color

  //Fetching the jwt from the local storage
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [user, setUser] = useLocalState("", "user");

  useEffect(() => {
    if (phoneNumber) {
      setInputBorderColor("#0F3FB2"); // Change border color when phone number is provided
      const detectedNetwork = detectNetwork(phoneNumber);
      if (detectedNetwork) {
        setNetwork(detectedNetwork.name);
        fetchBillerItems(detectedNetwork.biller_id);
      }
    } else {
      setInputBorderColor("#ccc"); // Reset border color if no phone number
    }
  }, [phoneNumber]);

  // Function to request data plans for a network
  const fetchBillerItems = async (billerId) => {
    console.log("running");

    if (!billerId) return;

    try {
      const response = await axios.get(
        `https://leverpay-api.azurewebsites.net/api/v1/user/quickteller/get-biller-payment-items?billerId=${billerId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setBillerItems(response.data); // Assuming the response has an 'items' field
      console.log("fetch res", response);
    } catch (error) {
      console.error("Error fetching biller items:", error);
    }
  };

  // const handleNetworkChange = (e) => setNetwork(e.target.value);

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newPhoneNumber);
    const detectedNetwork = detectNetwork(newPhoneNumber);
    if (detectedNetwork) {
      setNetwork(detectedNetwork.name);
      fetchBillerItems(detectedNetwork.biller_id);
    }
    setPhoneErrorMessage(""); // Clear phone error message when user starts typing
  };

  const handleDataPlanChange = (plan) => {
    setDataPlan(plan);
    setDataPlanErrorMessage(""); // Clear data plan error message when user starts typing
  };

  const handleSaveNumberChange = (e) => setSaveNumber(e.target.checked);

  const handleSubmit = () => {
    let hasError = false;

    if (!dataPlan) {
      setDataPlanErrorMessage("Please select a data plan.");
      hasError = true;
    } else if (
      dataPlan.Amount &&
      dataPlan.Amount > user.wallet.withdrawable_amount.ngn
    ) {
      setDataPlanErrorMessage(
        "Insufficient balance for the selected data plan."
      );
      hasError = true;
    } else {
      setDataPlanErrorMessage("");
    }

    if (phoneNumber.length !== 11) {
      setPhoneErrorMessage("Please enter a valid phone number.");
      hasError = true;
    } else {
      setPhoneErrorMessage("");
    }

    if (!hasError) {
      console.log({ network, phoneNumber, dataPlan, saveNumber });
      if (saveNumber) {
        localStorage.setItem("savedPhoneNumber", phoneNumber);
      } else {
        localStorage.removeItem("savedPhoneNumber");
      }

      localStorage.setItem(
        "billerData",
        JSON.stringify({
          customerId: user.uuid,
          amount: `${dataPlan.Amount}`,
          paymentCode: dataPlan.PaymentCode,
          itemName: dataPlan.Name,
          billerName: dataPlan.BillerName,
          billerCategoryId: dataPlan.BillerCategoryId,
          customerEmail: user.email,
          customerMobile: user.phone,
          refrenceNo: dataPlan.ReferenceNo,
        })
      );

      navigate("/data-payment");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const filterPlansByTab = () => {
    const tabKeywords = {
      daily: ["1 day", "1 Day", "2 days", "2-days", "3days", "3 days", "night"],
      weekly: ["1 week", "7 days", "7day", "14 days", "weekly"],
      monthly: [
        "30 days",
        "30days",
        "60 days",
        "90 days",
        "90days",
        "120days",
        "180 days",
        "monthly",
        "1 month",
        "365 days",
        "365days",
      ],
    };

    return billerItems.filter((item) =>
      tabKeywords[selectedTab].some((keyword) =>
        item.Name.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <div className={style.modal}>
      <h2 className={style.modalTitle}>Data Purchase</h2>
      <div className={style.networksRow}>
        {Object.keys(networkLogos).map((key) => (
          <img
            key={key}
            src={networkLogos[key]}
            alt={`${key} logo`}
            className={`${style.networkLogo} ${
              network === key ? style.selected : ""
            }`}
            onClick={() => {
              setNetwork(key);
              fetchBillerItems(detectNetwork(phoneNumber)?.biller_id);
            }}
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
          className={`${style.input} ${phoneNumber ? style.inputActive : ""}`}
          placeholder="Enter phone number"
        />
        {phoneErrorMessage && (
          <p className={style.errorMessage}>{phoneErrorMessage}</p>
        )}
      </div>
      <div className={style.tabs}>
        <div className={style.tabsInner}>
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              className={`${style.tab} ${
                selectedTab === tab ? style.selectedTab : style.deselectedTab
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className={style.dataPlansRow}>
        {phoneNumber ? (
          filterPlansByTab().length > 0 ? (
            filterPlansByTab().map((plan, index) => (
              <button
                key={index}
                className={`${style.dataPlanButton} ${
                  dataPlan.Name === plan.Name ? style.selectedDataPlan : ""
                }`}
                onClick={() => handleDataPlanChange(plan)}
              >
                {plan.Name}
              </button>
            ))
          ) : (
            <p className={style.message}>
              No data plans available for the selected network.
            </p>
          )
        ) : (
          <p className={style.message}>
            Enter your phone number for data bundle to load!
          </p>
        )}
      </div>
      {dataPlanErrorMessage && (
        <p className={style.errorMessage}>{dataPlanErrorMessage}</p>
      )}
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
    </div>
  );
}
