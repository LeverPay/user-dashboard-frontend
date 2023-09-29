import React, { useState, useEffect } from 'react'
import FundingSuccess from './FundingSuccess'
import Helpimageupload from "../HelpImageUpload/helpimageupload";
import axios from 'axios';
import { useLocalState } from '../../utils/useLocalStorage';


const FundingNaira = (props) => {
  const [jwt, setJwt] = useLocalState('', 'jwt')
  const [step, setStep] = useState(1)
  const [copyAlert, setCopyAlert] = useState('')
  const [rate, setRate] = useState('')
  const [leverpayaccounts, setLeverpayaccounts] = useState([])
  const [add_Info_txid, setAdd_info_txid] = useState(false)
  const [add_Info, setAdd_info] = useState('')
  const [fileImg, setFileimg] = useState()
  const [isAcct, setIsAcct] = useState(false)
  const [account_Info, setAccount_Info] = useState([])
  const [account_no, setAccount_no] = useState()
  const [account_name, setAccount_name] = useState()

  // const [imgfile, setImgfile] = useState()

  function getImg(a){
    setFileimg(a)
  }

  // GET ACCOUNT NUMBERS 
  useEffect(()=>{
    axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-account-numbers',  {
      headers: {
          Authorization : `Bearer ${jwt}`
      }
  })
    .then(res=>{
      console.log(res.data)
      setAccount_Info(res.data.data)
      if(res.data.data.length> 0){
        setIsAcct(true)
      }else setIsAcct(false)
    })
    .catch(err=>{
      console.log(err)
      setIsAcct(false)
    })
  },[])


  // account informations
  // const account_Info = [
  //   { bank: 'GT Bank', account_number: '0054789923', account_name: 'Bola' },
  //   { bank: 'First Bank', account_number: '3120789923', account_name: 'Ada' },
  //   { bank: 'Kuda Bank', account_number: '2054569929', account_name: 'aaaaa' },
  //   { bank: 'Providus Bank', account_number: '9105479905', account_name: 'bits' }
  // ]
  const unique_acct = {
    bank: 'Providus Bank',
    num: 400785634
  }

  const [formData, setFormData] = useState({
    amount: 0.00,
    charges: 0.00,
    Bank_name: isAcct ?  account_Info[0].name: '',
    txid: ''
  })

  function handleForm(e) {
    setFormData({
      ...formData,
      charges: 200.00,
      [e.target.name]: e.target.value
    })
  }
  useEffect(()=>{
    axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-exchange-rates',  {
      headers: {
          Authorization : `Bearer ${jwt}`
      }
  })
    .then(res=>{
      setRate(res.data.data)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  // rate conversion and amount props
  let dollar = formData.amount / (rate.rate * 1)
  let charge = formData.charges / (rate.rate * 1)
  const finalAmt = props.amt * (rate.rate * 1)
  useEffect(() => {
    if(rate){
    props.handleAmount(dollar + (charge * 1))
    }else{
      props.handleAmount('00' * 1)
    }
  }, [formData.amount])



  // account number 
  useEffect(() => {
    if(isAcct){
      if (formData.Bank_name === account_Info[0].bank) {
        setAccount_name(account_Info[0].account_name) 
        setAccount_no(account_Info[0].account_number)
      } else if (formData.Bank_name === account_Info[1].bank) {
        setAccount_name(account_Info[1].account_name) 
         setAccount_no(account_Info[1].account_number)
      } else if (formData.Bank_name === account_Info[2].bank) {
        setAccount_name(account_Info[2].account_name) 
         setAccount_no(account_Info[2].account_number)
      } else if (formData.Bank_name === account_Info[3].bank) {
        setAccount_name(account_Info[3].account_name) 
         setAccount_no(account_Info[3].account_number)
      }
    }
  }, [])



  const data = {
    reference: formData.txid,
    amount: finalAmt.toFixed(2) * 1,
    document: fileImg
  }
  // pagination
  function NextStep() {
    if(step === 3 && formData.txid === ''){
      setStep(3)
      setAdd_info('Provide your transaction id')
    }
    else if(step === 3){
      axios.post('https://leverpay-api.azurewebsites.net/api/v1/user/submit-topup-request', data, {
      headers:{
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${jwt}`,
      }
      })
      .then(res=>{
        console.log(res)
        setStep(step + 1)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    else{
      setStep(step + 1)
    }
  }

  function PrevStep() {
    setStep(step - 1)
  }

  // copy function
  function copyAcct() {
    navigator.clipboard.writeText(account_no);
    setCopyAlert('Copied')
  }
  function copPersonalAcct() {
    navigator.clipboard.writeText(unique_acct.num);
    setCopyAlert('Copied')
  }

  function handleformSubmit(e) {
    e.preventDefault()
    if(step === 6){
      axios.post('https://leverpay-api.azurewebsites.net/api/v1/user/submit-topup-request', data, {
      headers:{
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${jwt}`,
      }
      })
      .then(res=>{
        console.log(res)
        setStep(step + 1)
      })
      .catch(err=>{
        console.log(err)
      })
    }else setStep(step)
  }

  

  return (
    <>
      {
        step === 1 && <div className='FundingNaira'>
          <h1>
            Select your preferred means of payment
          </h1>
          <main className='transferC'>
            <div onClick={() => {
              setStep(5)
            }} >
              Transfer to your unique account Number
            </div>
            <div onClick={NextStep}>
              Transfer direct to leverpay
            </div>
          </main>
        </div>
      }
      {
        step === 2 && <div className='FundingAmount'>
          <main>
            <div className='FundingAmt'>
              <label htmlFor='amt' style={{ color: '#31353A' }}>Enter Amount(N)</label>
              <input
                type='number'
                placeholder='100000'
                name='amount'
                className="amts"
                value={formData.amount}
                onChange={handleForm}
              />
            </div>
            <div className='FundingAmt'>
              <label htmlFor='charges' style={{ color: '#CD4729' }}>Extra charges</label>
              <input
                type='text'
                name='charges'
                value={formData.charges}
                onChange={handleForm}
                readOnly
              />
            </div>
          </main>
          <button onClick={NextStep}>Proceed</button>
          <span onClick={PrevStep} className='FundingCancel'>
            <img alt='' src='/images/cancel.png' />
          </span>
        </div>
      }
      {
        step === 3 && <div className='FundingNairaBank'>
          <h1>Transfer NGN {finalAmt.toFixed(2)} to your Account</h1>
          <main>
            <div><h3>Account Name: </h3>  <h4>{isAcct? account_name: ''}</h4></div>
            <div><h3>Bank Name </h3>
              <select
                value={formData.Bank_name}
                onChange={handleForm}
                name="Bank_name"
                id="network"
                required
              >
                <option>Select Bank</option>
                { isAcct && 
                  account_Info.map(option => {
                    return (
                      <>
                      <option key={option.bank} value={option.bank} name='Bank_no' >
                        {option.bank}
                      </option>
                      </>
                    )
                  })
                }

              </select>
            </div>
            <div><h3>Account Number: </h3>  <h4>{isAcct ?account_no: ''}</h4><img alt='copy' onClick={copyAcct} src='/images/acct_cpy.png' />{copyAlert}</div>
            <div><h3>Amount: </h3>  <h4>NGN {finalAmt.toFixed(2)}</h4></div>
          </main>
          <section className='FundingAmt'>
            <span className="add_info" style={{ display: add_Info_txid ? 'block' : 'none' }}>
              <small>Make sure to provide your Transaction ID(TXID) before proceeding. You can find this in your transaction receipt </small>
            </span>
            <label htmlFor='txid'>Transaction Reference <img alt="info" src="/images/info.png" id="info" onMouseOver={() => {
              setAdd_info_txid(!add_Info_txid)
            }}
              onMouseLeave={() => {
                setAdd_info_txid(!add_Info_txid)
              }} /></label>
            <input
              type='text'
              name='txid'
              value={formData.txid}
              onChange={handleForm}
              required
              className="txReference"
              placeholder="Please enter your reference ID"
              style={{ color: 'black', fontWeight: '700' }}
            />
          </section>
          <div className="screenshot">
            <Helpimageupload GetfileImg={getImg} />
          </div>
          <button onClick={NextStep}>Payment Completed</button>
          <span onClick={PrevStep} className='FundingCancel'>
            <img alt='' src='/images/cancel.png' />
          </span>
        </div>
      }
      {
        step === 4 && <FundingSuccess />
      }
      {
        step === 5 && <div className='FundingAmount'>
          <main>
            <div className='FundingAmt'>
              <label htmlFor='amt' style={{ color: '#31353A' }}>Enter Amount(N)</label>
              <input
                type='number'
                placeholder='100000'
                name='amount'
                className="amts"
                value={formData.amount}
                onChange={handleForm}
              />
            </div>
            <div className='FundingAmt'>
              <label htmlFor='charges' style={{ color: '#CD4729' }}>Extra charges</label>
              <input
                type='text'
                name='charges'
                value={formData.charges}
                onChange={handleForm}
                readOnly
              />
            </div>
          </main>
          <button onClick={NextStep}>Proceed</button>
          <span onClick={PrevStep} className='FundingCancel'>
            <img alt='' src='/images/cancel.png' />
          </span>
        </div>
      }
      {
        step === 6 && <div className='FundingNairaBank'>
          <h1>Transfer NGN {finalAmt} to your Account</h1>
          <main>
            <div className='bnkInfo'><h3>Bank Name</h3><h4>{unique_acct.bank}</h4></div>
            <div className='bnkInfo'><h3>Account Number</h3><h4 style={{ opacity: '.4' }}>{unique_acct.num}   <img alt='copy' onClick={copPersonalAcct} src='/images/acct_cpy.png' />{copyAlert}</h4></div>
            <div><h3>Amount</h3><h4>NGN {finalAmt}</h4></div>
            <div><h3>Beneficiary</h3><h4>Mr. Patrick LeverPay</h4></div>
            <section className='FundingAmt'>
              <span className="add_info" style={{ display: add_Info_txid ? 'block' : 'none' }}>
                <small>Make sure to provide your Transaction ID(TXID) before proceeding. You can find this in your transaction receipt </small>
              </span>
              <label htmlFor='txid'>Transaction Reference <img alt="info" src="/images/info.png" id="info" onMouseOver={() => {
                setAdd_info_txid(!add_Info_txid)
              }}
                onMouseLeave={() => {
                  setAdd_info_txid(!add_Info_txid)
                }} /></label>
              <input
                type='text'
                name='txid'
                value={formData.txid}
                onChange={handleForm}
                required
                className="txReference"
                placeholder="Please enter your reference ID"
                style={{ color: 'black', fontWeight: '700' }}
              />
            </section>
            <div className="screenshot">
            <Helpimageupload GetfileImg={getImg} />
            </div>
          </main>
          <button onClick={handleformSubmit}>Proceed</button>
        </div>
      }
      {
        step === 7 && <FundingSuccess />
      }
    </>
  )
}

export default FundingNaira