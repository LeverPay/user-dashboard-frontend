import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import style from "./DataComponent.module.css";
import mtnLogo from "../../../assets/mtn.png";
import airtelLogo from "../../../assets/airtel.jpeg";
import gloLogo from "../../../assets/glo.png";
import nineMobileLogo from "../../../assets/9Mobile.png";
import { detectNetwork, useLocalState } from "../../../utils/useLocalStorage";
import eclipe from "../../../assets/Ellipse 1612.png";
import line from "../../../assets/Line 7.png";
import { TbCurrencyNaira } from "react-icons/tb";
import validityIcon from "../../../assets/Group 1000005189.png";
import durationIcon from "../../../assets/Group 1000005190.png";
import LoadingScreen from "../../reuseableComponents/LoadingPage/LoadingScreen";
import ErrorMessage from "../../reuseableComponents/errorMessage/ErrorMessage";

const networkLogos = {
  MTN: mtnLogo,
  Airtel: airtelLogo,
  Glo: gloLogo,
  "9mobile": nineMobileLogo,
};

const extractDaysFromName = (name) => {
  const match = name.match(/(\d+)\s*(day|days)/i);
  if (match) {
    const [_, number, dayType] = match;
    const formattedDayType = parseInt(number, 10) > 1 ? "days" : "day";
    return `${number} ${formattedDayType}`;
  }
  return "1 day";
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
  const [inputBorderColor, setInputBorderColor] = useState("#ccc");
  const [loading, setLoading] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [user, setUser] = useLocalState("", "user");

  useEffect(() => {
    if (phoneNumber.length === 11) {
      setInputBorderColor("#0F3FB2");
      const detectedNetwork = detectNetwork(phoneNumber);
      if (detectedNetwork) {
        setNetwork(detectedNetwork.name);
        setLoading(true);
        fetchBillerItems(detectedNetwork.biller_id).finally(() => {
          setLoading(false);
        });
      }
    } else {
      setInputBorderColor("#ccc");
      setNetwork("");
      setBillerItems([]);
      setLoading(false);
      setPhoneErrorMessage("Phone number must be 11 digits.");
    }
  }, [phoneNumber]);

  const fetchBillerItems = async (billerId) => {
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
      setBillerItems(response.data);
    } catch (error) {
      console.error("Error fetching biller items:", error);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newPhoneNumber);
    if (newPhoneNumber.length === 11) {
      const detectedNetwork = detectNetwork(newPhoneNumber);
      if (detectedNetwork) {
        setNetwork(detectedNetwork.name);
        fetchBillerItems(detectedNetwork.biller_id);
      }
      setPhoneErrorMessage("");
    } else {
      setNetwork("");
      setBillerItems([]);
      setPhoneErrorMessage("Phone number must be 11 digits.");
    }
  };

  const handleDataPlanChange = (plan) => {
    setDataPlan(plan);
    setDataPlanErrorMessage("");
  };

  const handleBuyNow = async (plan) => {
    handleDataPlanChange(plan);

    const amountNum = parseFloat(plan.Amount);
    if (amountNum > user.wallet.withdrawable_amount.ngn) {
      setDataPlanErrorMessage(
        "Insufficient balance, please fund your account or try a different plan."
      );
      return;
    }

    setLoading(true);

    try {
      if (saveNumber) {
        localStorage.setItem("savedPhoneNumber", phoneNumber);
      } else {
        localStorage.removeItem("savedPhoneNumber");
      }

      const billerData = {
        customerId: phoneNumber,
        amount: `${plan.Amount}`,
        paymentCode: plan.PaymentCode,
        itemName: plan.Name,
        billerName: plan.BillerName,
        billerCategoryId: plan.BillerCategoryId,
        customerEmail: user.email,
        customerMobile: user.phone,
        refrenceNo: plan.ReferenceNo,
        // saveNumber: saveNumber,
      };
console.log(billerData)
      localStorage.setItem("billerData", JSON.stringify(billerData));
      localStorage.setItem("selectedDataPlan", JSON.stringify(plan));

      navigate("/data-payment");
    } catch (error) {
      console.error("Error processing request:", error);
      setDataPlanErrorMessage("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
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
  
      
          <div className={style.header}>
            <FaChevronLeft
              className={style.cancelIcon}
              onClick={() => navigate(-1)}
            />
            <h2 className={style.modalTitle}>Data Purchase</h2>
          </div>
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
              className={`${style.input} ${
                phoneNumber ? style.inputActive : ""
              }`}
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
                    selectedTab === tab
                      ? style.selectedTab
                      : style.deselectedTab
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
                  <div
                    key={index}
                    className={`${style.dataPlan} ${
                      dataPlan.Name === plan.Name ? style.selectedDataPlan : ""
                    }`}
                    onClick={() => handleDataPlanChange(plan)}
                  >
                    <div className={style.dataPlanWrapper}>
                      <div className={style.topCase}>
                        <p>Get {plan.Name}</p>
                      </div>
                      <img src={eclipe} alt="Eclipe" className={style.eclipe} />
                      <div className={style.lowerCase}>
                        <div className={style.iconWrapper}>
                          <div className={style.iconDesign}>
                            <img src={validityIcon} alt="Validity Icon" />
                            <p>Validity</p>
                          </div>
                          <div className={style.display}>
                            <span className={style.price}>
                              {extractDaysFromName(plan.Name)}
                            </span>
                          </div>
                        </div>
                        <div className={style.line}>
                          <img
                            className={style.lineImage}
                            src={line}
                            alt="line"
                          />
                        </div>
                        <div className={style.iconWrapper}>
                          <div className={style.iconDesign}>
                            <img src={durationIcon} alt="Duration Icon" />
                            <p>Price</p>
                          </div>
                          <div className={style.display}>
                            <TbCurrencyNaira className={style.priceIcon} />
                            <span className={style.price}>{plan.Amount}</span>
                          </div>
                        </div>
                        <div className={style.buyNowDiv}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBuyNow(plan);
                            }}
                            className={style.buyNowButton}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={style.message}>
                  No data plans available for the selected network and duration.
                </p>
              )
            ) : (
              <p className={style.message}>
                Please enter your phone number to see data plans.
              </p>
            )}
          </div>
          
          {dataPlanErrorMessage && (
            <div className={style.errorWrapper}>
              <ErrorMessage
                errorMessage={dataPlanErrorMessage}
                onClose={() => setDataPlanErrorMessage("")} 
              />
            </div>
          )}
   
    </div>
  );
}
