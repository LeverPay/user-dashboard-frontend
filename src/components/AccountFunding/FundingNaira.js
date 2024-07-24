import React, { useState, useEffect } from 'react';
import FundingSuccess from './FundingSuccess';
import Helpimageupload from '../HelpImageUpload/helpimageupload';
import axios from 'axios';
import { useLocalState } from '../../utils/useLocalStorage';

const FundingNaira = ({ amt, handleAmount }) => {
  const [jwt] = useLocalState('', 'jwt');
  const [step, setStep] = useState(1);
  const [copyAlert, setCopyAlert] = useState('');
  const [rate, setRate] = useState('');
  // const [leverpayAccounts, setLeverpayAccounts] = useState([]);
  const [addInfoTxid, setAddInfoTxid] = useState(false);
  const [addInfo, setAddInfo] = useState('');
  const [fileImg, setFileImg] = useState(null);
  const [isAcct, setIsAcct] = useState(false);
  const [accountInfo, setAccountInfo] = useState([]);
  const [accountNo, setAccountNo] = useState('');
  const [accountName, setAccountName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const uniqueAcct = {
    bank: 'Providus Bank',
    num: 400785634,
  };

  const [formData, setFormData] = useState({
    amount: 0.0,
    charges: 0.0,
    Bank_name: isAcct ? accountInfo[0]?.name : '',
    txid: '',
  });

  useEffect(() => {
    axios
      .get('https://leverpay-api.azurewebsites.net/api/v1/user/get-account-numbers', {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setAccountInfo(res.data.data);
        setIsAcct(res.data.data.length > 0);
      })
      .catch(() => {
        setIsAcct(false);
      });
  }, [jwt]);

  useEffect(() => {
    axios
      .get('https://leverpay-api.azurewebsites.net/api/v1/user/get-exchange-rates', {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((res) => {
        setRate(res.data.data);
      })
      .catch(console.error);
  }, [jwt]);

  useEffect(() => {
    if (rate) {
      const dollar = formData.amount / rate.rate;
      const charge = formData.charges / rate.rate;
      handleAmount(dollar + charge);
    } else {
      handleAmount(0);
    }
  }, [formData.amount, rate, handleAmount]);

  useEffect(() => {
    if (isAcct) {
      const selectedBank = accountInfo.find((info) => info.bank === formData.Bank_name);
      if (selectedBank) {
        setAccountName(selectedBank.account_name);
        setAccountNo(selectedBank.account_number);
      }
    }
  }, [formData.Bank_name, accountInfo, isAcct]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      charges: 0,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if ((step === 2 || step === 5) && formData.amount <= 0) {
      setErrorMessage('Please enter an amount to proceed.');
      return;
    }
    //Reset error message to none
    setErrorMessage('');

    if (step === 3 && !formData.txid) {
      setAddInfo('Provide your transaction id');
    } else if (step === 3) {
      submitTopupRequest();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => setStep((prevStep) => prevStep - 1);

  const submitTopupRequest = () => {
    const data = {
      reference: formData.txid,
      amount: amt * rate.rate,
      document: fileImg,
    };

    axios
      .post('https://leverpay-api.azurewebsites.net/api/v1/user/submit-topup-request', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(() => setStep((prevStep) => prevStep + 1))
      .catch(console.error);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyAlert('Copied');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 6) {
      submitTopupRequest();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="FundingNaira">
            <h1>Select your preferred means of payment</h1>
            <main className="transferC">
              <div onClick={handleNextStep}>Transfer direct to leverpay</div>
              <div onClick={() => setStep(5)}>Transfer to your unique account Number</div>
            </main>
          </div>
        );
      case 2:
      case 5:
        return (
          <div className="FundingAmount">
            <main>
              <div className="FundingAmt">
                <label htmlFor="amt" style={{ color: '#31353A' }}>
                  Enter Amount(N)
                </label>
                <input
                  type="number"
                  placeholder="100000"
                  name="amount"
                  id="amt"
                  className="amts"
                  value={formData.amount}
                  onChange={handleFormChange}
                />
              </div>
              <div className="FundingAmt">
                <label htmlFor="charges" style={{ color: '#CD4729' }}>
                  Extra charges
                </label>
                <input type="text" name="charges" id="charges" value={formData.charges} readOnly />
              </div>
            </main>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button onClick={handleNextStep}>Proceed</button>
            {step === 2 ? (
              <span onClick={handlePrevStep} className="FundingCancel">
                <img alt="" src="/images/cancel.png" />
              </span>
              ) : (
              <span onClick={() => setStep(1)} className="FundingCancel">
                <img alt="" src="/images/cancel.png" />
              </span>
            )}
          </div>
        );
      case 3:
        return (
          <div className="FundingNairaBank">
            <h1>Transfer NGN {(amt * rate.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to your Account</h1>
            <main>
              <div className='account-number-details'>
                <h3>Account Name: </h3>
                <h4>{isAcct ? accountName : ''}</h4>
              </div>
              <div>
                <h3>BANK NAME </h3>
                <select value={formData.Bank_name} onChange={handleFormChange} name="Bank_name" required>
                  <option>Select your preferred Bank</option>
                  {isAcct &&
                    accountInfo.map((option) => (
                      <option key={option.bank} value={option.bank}>
                        {option.bank}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <h3>ACCOUNT NUMBER </h3>
                <h4>{isAcct ? accountNo : ''}</h4>
                <img alt="copy" onClick={() => copyToClipboard(accountNo)} src="/images/acct_cpy.png" />
                {copyAlert}
              </div>
              <div>
                <h3>AMOUNT </h3>
                <h4>NGN {(amt * rate.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
              </div>
            </main>
            
            <button onClick={handleNextStep}>Payment Completed</button>
            <span onClick={handlePrevStep} className="FundingCancel">
              <img alt="" src="/images/cancel.png" />
            </span>
          </div>
        );
      case 4:
      case 7:
        return <FundingSuccess />;
      case 6:
        return (
          <div className="FundingNairaBank">
            <h1>Transfer NGN {(amt * rate.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to your Account</h1>
            <main>
              <div className="bnkInfo">
                <h3>BANK NAME</h3>
                <h4>{uniqueAcct.bank}</h4>
              </div>
              <div className="bnkInfo">
                <h3>ACCOUNT NUMBER</h3>
                <h4 style={{ opacity: '.5' }}>
                  {uniqueAcct.num} {""}
                  <img alt="copy" onClick={() => copyToClipboard(uniqueAcct.num)} src="/images/acct_cpy.png" />
                  {copyAlert}
                </h4>
              </div>
              <div>
                <h3>AMOUNT</h3>
                <h4>NGN {(amt * rate.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
              </div>
              <div>
                <h3>BENEFICIARY</h3>
                <h4>Mr. Patrick LeverPay</h4>
              </div>
              <section className="FundingAmt">
                <span className="add_info" style={{ display: addInfoTxid ? 'block' : 'none' }}>
                  <small>Make sure to provide your Transaction ID (TXID) before proceeding. You can find this in your transaction receipt</small>
                </span>
                <label htmlFor="txid">
                  Transaction Reference
                  <img
                    alt="info"
                    id = "info"
                    src="/images/info.png"
                    onMouseOver={() => setAddInfoTxid(true)}
                    onMouseLeave={() => setAddInfoTxid(false)}
                  />
                </label>
                <input
                  type="text"
                  name="txid"
                  value={formData.txid}
                  onChange={handleFormChange}
                  required
                  className="txReference"
                  placeholder="Please enter your reference ID"
                  style={{ color: 'black', fontWeight: '700' }}
                />
              </section>
              <section className="screenshot">
                <Helpimageupload GetfileImg={setFileImg}/>
              </section>
            </main>
            <div className='button-container'>
            <button onClick={handleSubmit}>Confirm Payment</button>
            <button onClick={() => setStep(1)}>Cancel Payment</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderStepContent()}</>;
};

export default FundingNaira;
