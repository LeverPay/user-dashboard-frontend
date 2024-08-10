import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import style from "./CableTvComponent.module.css";
import { useLocalState } from "../../../utils/useLocalStorage";
import { getBillerPaymentItem, validateCustomer } from "../../../services/apiService";

const providerDetails = {
  DSTV: { id: 104, PaydirectItemCode: 10477 },
  GOTV: { id: 459, PaydirectItemCode: 459123 },
  StarTimes: { id: 240, PaydirectItemCode: 158058 },
};

const CableTvPaymentScreenComponent = () => {
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState(null);
  const [billerItems, setBillerItems] = useState([]);
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [smartCardNumberFocused, setSmartCardNumberFocused] = useState(false);
  const [packageOption, setPackageOption] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [providerError, setProviderError] = useState("");
  const [smartCardError, setSmartCardError] = useState("");
  const [packageError, setPackageError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
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
      setProviderError("JWT token is missing. Please log in again.");
      return;
    }
    setIsLoading(true);
    try {
      const data = await getBillerPaymentItem(providerId, jwt);
      setBillerItems(data);
      setProviderError(""); // Clear any previous errors
    } catch (error) {
      setProviderError("Failed to fetch biller payment items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
    const handleSmartCardNumberChange = async (e) => {
      const smartCard = e.target.value;
      setSmartCardNumber(smartCard);
  
      if (smartCard.length >= 10 && provider) {
        setIsValidating(true);
        setValidationError("");
        try {
          // Validate the Smart Card Number using provider Id
          const validationData = await validateCustomer(smartCard,  providerDetails[provider.Name].PaydirectItemCode, jwt);
          
          console.log("Validation Data:", validationData); // Log the raw data
  
          setCustomerDetails(validationData.Customers[0]);
          setValidationError("");
        } catch (error) {
          console.error("Error during validation:", error); // Log the error for debugging
          setValidationError("Failed to validate customer. Please check the Smart Card Number.");
        } finally {
          setIsValidating(false);
        }
      }
  };
  
  const handleProviderChange = (e) => {
    const selectedProviderId = e.target.value;
    const selectedProvider = providers.find((p) => p.Id === parseInt(selectedProviderId));
    setProvider(selectedProvider);
    fetchBillerPaymentItems(selectedProviderId);
    // Clear any validation errors when provider changes
    setValidationError("");
  };

  // const handleSmartCardNumberChange = (e) => {
  //   const smartCard = e.target.value;
  //   setSmartCardNumber(smartCard);
  //   if (smartCard) {
  //     validateSmartCardNumber(); // Call validation API as soon as the card number is entered
  //   }
  // };

  const handlePackageOptionChange = (e) => {
    const selectedPackageId = e.target.value;
    const selectedPackage = billerItems.find((item) => item.Id === selectedPackageId);
    setPackageOption(selectedPackageId);
    setSelectedPackage(selectedPackage);
    if (!selectedPackage) {
      setPackageError("Selected package is invalid.");
    } else {
      setPackageError(""); // Clear any previous errors
    }
  };

  const handleSubmit = () => {
    if (!provider || !smartCardNumber || !selectedPackage || !customerDetails) {
      setProviderError(!provider ? "Please select a provider." : "");
      setSmartCardError(!smartCardNumber ? "Please enter a smart card number." : "");
      setPackageError(!selectedPackage ? "Please select a package." : "");
      setValidationError(!customerDetails ? "Please validate the Smart Card Number." : "");
      return;
    }

    const billerData = {
      providerId: provider.Id,
      paymentCode: selectedPackage?.PaymentCode,
      CustomerId: smartCardNumber,
      providerName: provider.Name,
      customerName: customerDetails.CustomerName,
      smartCardNumber,
      packageOption: selectedPackage?.Id,
      amount: selectedPackage?.Amount,
    };

    console.log("Biller Data:", JSON.stringify(billerData));

    localStorage.setItem("billerData", JSON.stringify(billerData));
    navigate("/cable-tv-payment");
  };

  return (
    <div className={style.mainDiv}>
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
          {providerError && <p className={style.errorMessage}>{providerError}</p>}
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
        {isValidating && <p className={style.loadingMessage}>Validating Smart Card Number...</p>}
        {validationError && <p className={style.errorMessage}>{validationError}</p>}
        {customerDetails && (
          <p className={style.successMessage}>{customerDetails.FullName}</p>
        )}
        {smartCardError && <p className={style.errorMessage}>{smartCardError}</p>}
      </div>

      <div className={style.formGroup}>
        <h1 className={style.formLabel}>Package</h1>
        <div className={style.dropdown}>
          <select value={packageOption} onChange={handlePackageOptionChange} className={style.select}>
            <option value="" disabled>Select package</option>
            {isLoading ? (
              <option>Loading packages...</option>
            ) : (
              billerItems?.map((item) => (
                <option key={item.Id} value={item.Id}>
                  {item.Name}
                </option>
              ))
            )}
          </select>
          {packageError && <p className={style.errorMessage}>{packageError}</p>}
        </div>
      </div>

      {selectedPackage && (
        <div className={style.amountDiv}>
          <p className={style.amountText}>Amount: NGN {selectedPackage.Amount}</p>
        </div>
      )}

      <div className={style.buttonGroup}>
        <button type="button" className={style.buttonSubmit} onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default CableTvPaymentScreenComponent;
