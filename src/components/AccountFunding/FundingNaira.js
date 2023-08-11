import React, { useState, useEffect } from 'react'
import FundingSuccess from './FundingSuccess'

const FundingNaira = (props) => {
  const [step, setStep] = useState(1)
  const [copyAlert, setCopyAlert] = useState('')

  const finalAmt = props.amt * 750


  // account informations
  const account_Info = [
    { name: 'GT Bank', number: '0054789923' },
    { name: 'First Bank', number: '3120789923' },
    { name: 'Kuda Bank', number: '2054569929' },
    { name: 'Providus Bank', number: '9105479905' }
  ]
  const unique_acct = {
    bank: 'Providus Bank',
    num: 400785634
  }

  const [formData, setFormData] = useState({
    amount: 0.00,
    charges: 0.00,
    Bank_name: account_Info[0].name,
    txid: ''
  })

  function handleForm(e) {
    setFormData({
      ...formData,
      charges: 200.00,
      [e.target.name]: e.target.value
    })
  }

  // rate conversion and amount props
  let dollar = formData.amount / 750
  let charge = formData.charges / 750
  useEffect(() => {
   props.handleAmount((Number(dollar) + Number(charge)).toFixed(3))
  },[formData.amount])



  // account number 
  const [account_no, setAccount_no] = useState(account_Info[0].number)
  useEffect(() => {
    if (formData.Bank_name === account_Info[0].name) {
      return setAccount_no(account_Info[0].number)
    } else if (formData.Bank_name === account_Info[1].name) {
      return setAccount_no(account_Info[1].number)
    } else if (formData.Bank_name === account_Info[2].name) {
      return setAccount_no(account_Info[2].number)
    } else if (formData.Bank_name === account_Info[3].name) {
      return setAccount_no(account_Info[3].number)
    }
  }, [handleForm])


  // pagination
  function NextStep() {
    setStep(step + 1)
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
    setStep(step + 1)
  }


  return (
    <>
      {
        step === 1 && <div className='FundingNaira'>
          <h1>
            Select your preferred means of payment
          </h1>
          <main className='transferC'>
            <div onClick={()=>{
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
          <h1>Transfer NGN {finalAmt} to your Account</h1>
          <main>
            <div><h3>Account Name: </h3>  <h4>Leverchain Technology Limited</h4></div>
            <div><h3>Bank Name </h3>
              <select
                value={formData.Bank_name}
                onChange={handleForm}
                name="Bank_name"
                id="network"
                required
              >
                {
                  account_Info.map(option => {
                    return (
                      <option key={option.name} value={option.name} name='Bank_no' >
                        {option.name}
                      </option>
                    )
                  })
                }

              </select>
            </div>
            <div><h3>Account Number: </h3>  <h4>{account_no}</h4><img alt='copy' onClick={copyAcct} src='/images/acct_cpy.png' />{copyAlert}</div>
            <div><h3>Amount: </h3>  <h4>NGN {finalAmt}</h4></div>
          </main>
          <section className='FundingAmt'>
              <label htmlFor='txid'>Transaction Reference</label>
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
          <button onClick={NextStep}>Proceed</button>
          <span onClick={PrevStep} className='FundingCancel'>
                        <img alt='' src='/images/cancel.png' />
                    </span>
        </div>
      }
      {
        step===4 && <FundingSuccess/>
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
              <label htmlFor='txid'>Transaction Reference</label>
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
          </main>
          <button onClick={handleformSubmit}>Proceed</button>
        </div>
      }
      {
        step===7 && <FundingSuccess/>
      }
    </>
  )
}

export default FundingNaira