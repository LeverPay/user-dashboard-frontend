import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './DataComponent.module.css';
import mtnLogo from '../../../assets/mtn.png';
import airtelLogo from "../../../assets/airtel.jpeg";
import gloLogo from '../../../assets/glo.png';
import nineMobileLogo from '../../../assets/9mobile.webp';
import { detectNetwork, useLocalState } from "../../../utils/useLocalStorage";

const networkLogos = {
  MTN: mtnLogo,
  Airtel: airtelLogo,
  Glo: gloLogo,
  '9mobile': nineMobileLogo,
};

const dataPlans = {
  MTN: ['500MB - N100', '1GB - N200', '2GB - N500'],
  Airtel: ['500MB - N150', '1GB - N300', '2GB - N600'],
  Glo: ['500MB - N100', '1GB - N200', '2GB - N500'],
  '9mobile': ['500MB - N150', '1GB - N300', '2GB - N600'],
};

export default function DataComponent() {
  const navigate = useNavigate();
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useLocalState('', 'savedPhoneNumber');
  const [dataPlan, setDataPlan] = useState('');
  const [saveNumber, setSaveNumber] = useState(!!phoneNumber);
  const [balance, setBalance] = useState(1000); // Example balance
  const [errorMessage, setErrorMessage] = useState('');

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
    const newPhoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhoneNumber(newPhoneNumber);
    const detectedNetwork = detectNetwork(newPhoneNumber);
    if (detectedNetwork) {
      setNetwork(detectedNetwork);
    }
  };

  const handleDataPlanChange = (e) => setDataPlan(e.target.value);
  const handleSaveNumberChange = (e) => setSaveNumber(e.target.checked);

  const handleSubmit = () => {
    const planCost = parseFloat(dataPlan.split('- N')[1]);
    if (!dataPlan) {
      setErrorMessage('Please select a data plan.');
    } else if (isNaN(planCost) || planCost > balance) {
      setErrorMessage('Insufficient balance for the selected data plan.');
    } else {
      console.log({ network, phoneNumber, dataPlan, saveNumber });
      setErrorMessage('');
      if (saveNumber) {
        localStorage.setItem('savedPhoneNumber', phoneNumber);
      } else {
        localStorage.removeItem('savedPhoneNumber');
      }
      setBalance(balance - planCost); // Deduct the cost from the balance
      navigate('/next-page'); // Navigate to the next page
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous screen
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
      </div>
      <div className={style.formGroup}>
        <h1 className={style.formLabel}>Data Plan</h1>
        <select
          id="dataPlan"
          value={dataPlan}
          onChange={handleDataPlanChange}
          className={style.select}
        >
          <option value="">Select a data plan</option>
          {dataPlans[network]?.map((plan, index) => (
            <option key={index} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>
      <div className={style.formGroupCheckbox}>
        <input
          type="checkbox"
          id="saveNumber"
          checked={saveNumber}
          onChange={handleSaveNumberChange}
        />
        <p className={style.formLabelCheckbox}>Save this number for future transactions</p>
      </div>
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
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
