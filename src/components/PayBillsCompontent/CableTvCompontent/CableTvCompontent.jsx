import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import style from "./CableTvComponent.module.css";
import { useLocalState } from "../../../utils/useLocalStorage";
import { getBillerPaymentItem } from "../../../services/apiService";
import LoadingScreen from "../../reuseableComponents/LoadingPage/LoadingScreen";

const providerDetails = {
  DSTV: { id: 104 },
  GOTV: { id: 459 },
  StarTimes: { id: 204 },
};

const CableTvPaymentScreenComponent = () => {
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState(null);
  const [billerItems, setBillerItems] = useState([]);
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [smartCardNumberFocused, setSmartCardNumberFocused] = useState(false);
  const [packageOption, setPackageOption] = useState("");
  const [amount, setAmount] = useState(0); // Store the selected package amount here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jwt] = useLocalState("", "jwt");

  const navigate = useNavigate();

  useEffect(() => {
    const formattedProviders = Object.keys(providerDetails).map((key) => ({
      Name: key,
      Id: providerDetails[key].id,
    }));
    setProviders(formattedProviders);
  }, []);

  const fetchBillerPaymentItems = async (providerId) => {
    if (!jwt) {
      setError("JWT token is missing. Please log in again.");
      return;
    }
    try {
      setLoading(true);
      const data = await getBillerPaymentItem(providerId, jwt);
      setBillerItems(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch biller payment items. Please try again.");
      setLoading(false);
    }
  };

  const handleProviderChange = (e) => {
    const selectedProviderId = e.target.value;
    setProvider(providers.find((p) => p.Id === parseInt(selectedProviderId)));
    fetchBillerPaymentItems(selectedProviderId);
  };

  const handleSmartCardNumberChange = (e) => {
    setSmartCardNumber(e.target.value);
  };

  const handlePackageOptionChange = (e) => {
    const selectedPackageId = parseInt(e.target.value);
    const selectedPackage = billerItems.find((item) => item.Id === selectedPackageId);
    setPackageOption(selectedPackageId);
    setAmount(selectedPackage.Amount || 0); // Update the amount state with the selected package amount
  };

  const handleSubmit = () => {
    // Add form submission logic here
  };

  return (
    <div className={style.mainDiv}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className={style.header}>
            <FaChevronLeft className={style.cancelIcon} onClick={() => navigate(-1)} />
            <h2 className={style.modalTitle}>Cable TV</h2>
          </div>

          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Provider</h1>
            <div className={style.dropdown}>
              <select value={provider?.Id || ""} onChange={handleProviderChange} className={style.select}>
                <option value="" disabled>Select provider</option>
                {providers.map((provider) => (
                  <option key={provider.Id} value={provider.Id}>
                    {provider.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={style.formGroup}>
            <h1 className={style.formLabel}>
              {billerItems?.length > 0 ? billerItems[0].ConsumerIdField : "Smart Card Number"}
            </h1>
            <input
              type="text"
              inputMode="numeric"
              id="smartCardNumber"
              value={smartCardNumber}
              onChange={handleSmartCardNumberChange}
              onFocus={() => setSmartCardNumberFocused(true)}
              onBlur={() => setSmartCardNumberFocused(smartCardNumber !== "")}
              className={`${style.input} ${smartCardNumberFocused || smartCardNumber ? style.inputActive : ""}`}
              placeholder="Enter smart card number"
            />
            {error && <p className={style.errorMessage}>{error}</p>}
          </div>

          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Package</h1>
            <div className={style.dropdown}>
              <select value={packageOption} onChange={handlePackageOptionChange} className={style.select}>
                <option value="" disabled>Select package</option>
                {billerItems?.map((item) => (
                  <option key={item.Id} value={item.Id}>
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Conditionally render amount */}
          {packageOption && (
            <div className={style.amountDiv}>
              <p className={style.amountText}>Amount: NGN {amount}</p>
            </div>
          )}

          <div className={style.buttonGroup}>
            <button type="button" className={style.buttonSubmit} onClick={handleSubmit}>
              Proceed
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CableTvPaymentScreenComponent;
