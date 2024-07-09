import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './DataComponent.module.css';
import mtnLogo from '../../../assets/mtn.png';
import airtelLogo from "../../../assets/airtel.jpeg";
import gloLogo from "../../../assets/glo.jpeg";
import nineMobileLogo from '../../../assets/9mobile.webp';
import { detectNetwork, useLocalState } from "../../../utils/useLocalStorage";

const networkLogos = {
  MTN: mtnLogo,
  Airtel: airtelLogo,
  Glo: gloLogo,
  '9mobile': nineMobileLogo,
};

const dataPlans = {
  MTN: {
    daily: ['500MB - N100', '1GB - N200'],
    weekly: ['2GB - N500', '5GB - N1000'],
    monthly: ['10GB - N2000', '20GB - N3500'],
  },
  Airtel: {
    daily: ['500MB - N150', '1GB - N300'],
    weekly: ['2GB - N600', '5GB - N1200'],
    monthly: ['10GB - N2500', '20GB - N4000'],
  },
  Glo: {
    daily: ['500MB - N100', '1GB - N200'],
    weekly: ['2GB - N500', '5GB - N1000'],
    monthly: ['10GB - N2000', '20GB - N3500'],
  },
  '9mobile': {
    daily: ['500MB - N150', '1GB - N300'],
    weekly: ['2GB - N600', '5GB - N1200'],
    monthly: ['10GB - N2500', '20GB - N4000'],
  },
};

export default function DataComponent() {
  const navigate = useNavigate();
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useLocalState('savedPhoneNumber', '');
  const [dataPlan, setDataPlan] = useState('');
  const [saveNumber, setSaveNumber] = useState(!!phoneNumber);
  const [balance, setBalance] = useState(1000); // Example balance
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [dataPlanErrorMessage, setDataPlanErrorMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState('daily'); // Ensure default is 'daily'

  useEffect(() => {
    if (phoneNumber) {
      const detectedNetwork = detectNetwork(phoneNumber);
      if (detectedNetwork) {
        setNetwork(detectedNetwork);
      }
    }
  }, [phoneNumber]);

  const handleNetworkChange = (e) => setNetwork(e.target.value);
  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, ''); 
    setPhoneNumber(newPhoneNumber);
    const detectedNetwork = detectNetwork(newPhoneNumber);
    if (detectedNetwork) {
      setNetwork(detectedNetwork);
    }
    setPhoneErrorMessage(''); // Clear phone error message when user starts typing
  };

  const handleDataPlanChange = (plan) => {
    setDataPlan(plan);
    setDataPlanErrorMessage(''); // Clear data plan error message when user starts typing
  };

  const handleSaveNumberChange = (e) => setSaveNumber(e.target.checked);

  const handleSubmit = () => {
    const planCost = parseFloat(dataPlan.split('- N')[1]);
    let hasError = false;

    if (!dataPlan) {
      setDataPlanErrorMessage('Please select a data plan.');
      hasError = true;
    } else if (isNaN(planCost) || planCost > balance) {
      setDataPlanErrorMessage('Insufficient balance for the selected data plan.');
      hasError = true;
    } else {
      setDataPlanErrorMessage('');
    }

    if (phoneNumber.length !== 11) {
      setPhoneErrorMessage('Please enter a valid phone number.');
      hasError = true;
    } else {
      setPhoneErrorMessage('');
    }

    if (!hasError) {
      console.log({ network, phoneNumber, dataPlan, saveNumber });
      if (saveNumber) {
        localStorage.setItem('savedPhoneNumber', phoneNumber);
      } else {
        localStorage.removeItem('savedPhoneNumber');
      }
      setBalance(balance - planCost); 
      navigate('/next-page'); 
    }
  };

  const handleCancel = () => {
    navigate(-1); 
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
            className={`${style.networkLogo} ${network === key ? style.selected : ''}`}
            onClick={() => setNetwork(key)}
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
        {phoneErrorMessage && <p className={style.errorMessage}>{phoneErrorMessage}</p>}
      </div>
      <div className={style.tabs}>
        {['daily', 'weekly', 'monthly'].map((tab) => (
          <button
            key={tab}
            className={`${style.tab} ${selectedTab === tab ? style.selectedTab : style.deselectedTab}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className={style.dataPlansRow}>
        {dataPlans[network]?.[selectedTab]?.map((plan, index) => (
          <button
            key={index}
            className={`${style.dataPlanButton} ${dataPlan === plan ? style.selectedDataPlan : ''}`}
            onClick={() => handleDataPlanChange(plan)}
          >
            {plan}
          </button>
        ))}
      </div>
      {dataPlanErrorMessage && <p className={style.errorMessage}>{dataPlanErrorMessage}</p>}
      <div className={style.formGroupCheckbox}>
        <input
          type="checkbox"
          id="saveNumber"
          checked={saveNumber}
          onChange={handleSaveNumberChange}
        />
        <p className={style.formLabelCheckbox}>Save this number for future transactions</p>
      </div>
      <div className={style.buttonGroup}>
        <button type="button" className={style.buttonSubmit} onClick={handleSubmit}>
          Proceed
        </button>
        <button type="button" className={style.buttonCancel} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
