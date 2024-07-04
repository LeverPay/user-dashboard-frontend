import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './AirtimeComponent.module.css';
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

const AirtimeComponent = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useLocalState('savedPhoneNumber', '');
  const [amount, setAmount] = useState('');
  const [saveNumber, setSaveNumber] = useState(!!phoneNumber);
  const [balance, setBalance] = useState(1000);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (phoneNumber) {
      const detectedNetwork = detectNetwork(phoneNumber);
      if (detectedNetwork) {
        setNetwork(detectedNetwork);
      }
    }
  }, [phoneNumber]);

  useEffect(() => {
    console.log('Component mounted or updated');
    console.log('Network:', network);
    console.log('Phone Number:', phoneNumber);
    console.log('Amount:', amount);
    console.log('Save Number:', saveNumber);
    console.log('Balance:', balance);
    console.log('Error Message:', errorMessage);
  }, [network, phoneNumber, amount, saveNumber, balance, errorMessage]);

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhoneNumber(newPhoneNumber);
    const detectedNetwork = detectNetwork(newPhoneNumber);
    if (detectedNetwork) {
      setNetwork(detectedNetwork);
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setAmount(newAmount);
  };

  const handleSaveNumberChange = (e) => setSaveNumber(e.target.checked);

  const handleSubmit = () => {
    const amountNum = parseFloat(amount);
    console.log('Submitting:', { network, phoneNumber, amountNum, balance });

    if (isNaN(amountNum)) {
      setErrorMessage('Please enter a valid number.');
      return;
    } else if (amountNum > balance) {
      setErrorMessage('Amount entered is greater than balance.');
      return;
    } else if (amountNum < 50) {
      setErrorMessage('Amount entered can be less than 50 Naira.');
      return;
    } else {
      setErrorMessage('');
      if (saveNumber) {
        localStorage.setItem('savedPhoneNumber', phoneNumber);
      } else {
        localStorage.removeItem('savedPhoneNumber');
      }
      setBalance(balance - amountNum); 
      navigate('/nextPage'); // Navigate to the next page
    }
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous screen
  };

  return (
    <div className={style.mainDiv}>
      <h2 className={style.modalTitle}>Airtime Purchase</h2>
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
        <h1 className={style.formLabel}>Airtime Amount (Naira)</h1>
        <input
          type="text"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className={style.input}
          placeholder="Enter amount"
        />
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
};

export default AirtimeComponent;
