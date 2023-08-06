import React, { useState, useEffect } from 'react'

const FundingNaira = (props) => {
  const [step, setStep] = useState(1)
  const [copyAlert, setCopyAlert] = useState('')
  const [account_number, setAccount_number] = useState(2002457890)
  const [formData, setFormData] = useState({
    amount: '',
})

function handleForm(e) {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  })
}

useEffect(()=>{
  props.handleAmount(formData.amount - Number(formData.amount) * 0.08)
}, [handleForm])

  function NextStep() {
    setStep(step + 1)
  }

  function PrevStep() {
    setStep(step - 1)
  }
  function copyAcct() {
    navigator.clipboard.writeText(account_number);
    setCopyAlert('Copied')
  }

  return (
    <>
      {
        step === 1 && <div className='FundingNaira'>
          <h1>
            Select your preferred means of payment
          </h1>
          <main className='transferC'>
            <div onClick={NextStep} >
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
                            <label htmlFor='amt' style={{ color: '#31353A' }}>Enter Amount</label>
                            <input
                                type='number'
                                placeholder='250.00'
                                name='amount'
                                value={formData.amount}
                                onChange={handleForm}
                            />
                        </div>
                        <div className='FundingAmt'>
                            <label htmlFor='Vat' style={{ color: '#CD4729' }}>Vat (8%)</label>
                            <input
                                type='text'
                                placeholder='10.00'
                                name='Vat'
                                value={Number(formData.amount) * 0.08}
                                onChange={handleForm}
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
        step === 3 && <div className='FundingNaira'>
          <main className='FundingBankTransfer'>
            <h1>
              Bank Details
            </h1>
            <h6>
              Amount : {formData.amount}
            </h6>
            <span>
              <small>Bank name</small>
              <h3>Providus Bank</h3>
            </span>
            <span>
              <small>Account name</small>
              <h3>LeverPay / Shezzy</h3>
            </span>
            <span>
              <small>Acct. No.</small>
              <h3>{account_number} <img alt='' src='/images/copy2.png' className='acctnoCopy' onClick={copyAcct} /> <small id='copyAlert'>{copyAlert}</small></h3>
            </span>
          </main>
          <span onClick={PrevStep} className='FundingCancel'>
            <img alt='' src='/images/cancel.png' />
          </span>
        </div>
      }
     
    </>
  )
}

export default FundingNaira