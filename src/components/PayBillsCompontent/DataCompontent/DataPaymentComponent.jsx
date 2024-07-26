import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useLocalState } from '../../../utils/useLocalStorage';
import { submitBillPayment } from '../../../services/apiService';
import LoadingScreen from '../../LoadingPage/LoadingScreen';
import style from '../AirtimeCompontent/AirtimeComponent.module.css';

const DataPaymentComponent = () => {
  const [pin, setPin] = useState('');
  const [pinErrorMessage, setPinErrorMessage] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [dataPlan, setDataPlan] = useState('');
  const [saveNumber, setSaveNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jwt] = useLocalState('', 'jwt');

  useEffect(() => {
    const billerData = JSON.parse(localStorage.getItem('billerData'));
    console.log('Biller Data:', billerData); // Add this line to check data
    if (billerData) {
      setPhoneNumber(billerData.customerMobile);
      setAmount(billerData.amount);
      setDataPlan(billerData.itemName);
      setSaveNumber(billerData.saveNumber);
    }
  }, []);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setPin(value);
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pin === '') {
      setPinErrorMessage('PIN cannot be empty.');
      return;
    }
    if (pin.length !== 4) {
      setPinErrorMessage('PIN must be exactly 4 digits.');
      return;
    }
    try {
      const billerData = JSON.parse(localStorage.getItem('billerData'));
      if (!billerData) {
        throw new Error('Biller data not found.');
      }

      setLoading(true);
      const response = await submitBillPayment(
        {
          ...billerData,
          pin,
        },
        jwt
      );
      console.log('Payment successful:', response);

      navigate('/success');
    } catch (error) {
      console.error('Error submitting payment:', error);
      setPinErrorMessage('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
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
          <h2 className={style.modalTitle}>Data</h2>
          <div className={style.bundle}>
            <h1>Bundle Details</h1>
            <div className={style.bundleDetails}>
            <h2 className={style.detailHead}>
                Get <span>{dataPlan}</span>
              </h2>
{/*             
              <p className={style.detail}>
                Get <span>{dataPlan}</span>
              </p> */}
              {/* <p className={style.detail}>
                Amount: <span>₦{amount}</span>
              </p> */}
            </div>
          </div>
          <div className={style.formGroup}>
            <h1 className={style.formLabel}>Purchasing for</h1>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              readOnly
              className={style.input}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.formGroup}>
              <h1 className={style.formLabel}>Transaction Pin</h1>
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter Pin"
                className={style.input}
                maxLength={4}
                aria-label="Transaction Pin"
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
            <div className={style.formGroupCheckbox}>
              <label className={style.switch}>
                <input
                  type="checkbox"
                  checked={saveNumber}
                />
                <span className={`${style.slider} ${saveNumber ? style.activeSlider : ""}`}></span>
              </label>
            </div>
            <p className={`${style.formLabelCheckbox} ${saveNumber ? style.activeText : ""}`}>
              Auto Renew
            </p>
            <div className={style.buttonGroup}>
              <button
                type="submit"
                className={style.buttonSubmit}
              >
                Confirm
              </button>
              <button
                type="button"
                className={style.buttonCancel}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default DataPaymentComponent;
