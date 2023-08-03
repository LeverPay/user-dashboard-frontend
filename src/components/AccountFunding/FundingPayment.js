import React, { useEffect, useState } from 'react'
import FundingInitiating from './FundingInitiating'
import FundingCancel from './FundingCancel'

const FundingPayment = (props) => {
    const [exchange, setExchange] = useState("Binance")
    const [step, setStep] = useState(1)
    const [copAlert, setCopyAlert] = useState('')
    const [formData, setFormData] = useState({
        amount: '',
        userID: '16yge73ghuyw',
        txid: '78ghavd78152fasghas'
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
        return setStep(step + 1)
    }
    function PrevStep() {
        setStep(step - 1)
    }
    function copyAcct(){
        navigator.clipboard.writeText(formData.txid);
        setCopyAlert('copied')
      }

    const onOptionChange = e => {
        setExchange(e.target.value)
    }
    function handleformSubmit(e) {
        e.preventDefault()
        setStep(step + 1)

    }
    return (
        <form onSubmit={NextStep}>
            {
                step === 1 && <div className='FundingPayment'>
                    <h2>
                        Select your Crypto Exchange to proceed!
                    </h2>
                    <main>
                        <ul>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="exchnage"
                                        value="Binance"
                                        id="Binance"
                                        checked={exchange === "Binance"}
                                        onChange={onOptionChange}
                                        onClick={NextStep}
                                    />
                                    Binance
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="exchnage"
                                        value="CoinBase"
                                        id="CoinBase"
                                        checked={exchange === "CoinBase"}
                                        onChange={onOptionChange}
                                        onClick={NextStep}
                                    />
                                    CoinBase
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="exchnage"
                                        value="Huobi"
                                        id="Huobi"
                                        checked={exchange === "Huobi"}
                                        onChange={onOptionChange}
                                        onClick={NextStep}
                                    />
                                    Huobi
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="exchnage"
                                        value="Luno"
                                        id="Luno"
                                        checked={exchange === "Luno"}
                                        onChange={onOptionChange}
                                        onClick={NextStep}
                                    />
                                    Luno
                                </label>
                            </li>
                        </ul>
                    </main>
                 
                </div>
            }
            {
                step === 2 && <div className='FundingAmount'>
                    <FundingInitiating exchange={exchange} />
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
                step === 3 && <div className='FundingAmount'>
                    <FundingInitiating exchange={exchange} />
                    <main>
                        <div className='FundingAmt'>
                            <label htmlFor='userID' style={{ color: '#31353A' }}>LeverPay UserID</label>
                            <input
                                type='text'
                                name='userID'
                                value={formData.userID}
                                onChange={handleForm}
                                disabled={true}
                                style={{ color: 'black', fontSize: '18px', fontWeight: '700' }}
                            />
                        </div>
                        <div className='FundingAmt'>
                            <label htmlFor='txid' style={{ color: '#CD4729' }}>Enter your leverpay Transaction Code</label>
                            <input
                                type='text'
                                name='txid'
                                value={formData.txid}
                                onChange={handleForm}
                                style={{ color: 'black', fontSize: '18px', fontWeight: '700' }}
                            />
                            <img alt='copy' src='/images/copy2.png' id='fundTxidCopy' onClick={copyAcct}  /> 
                            <span id='txidcopy'>{copAlert}</span>
                        </div>
                    </main>
                    <button onClick={handleformSubmit}>Proceed</button>
                    <span onClick={PrevStep} className='FundingCancel'>
                    <img alt='' src='/images/cancel.png' />
                    </span>
                </div>
            }
            {
                step === 4 && <div className='fundingSuccess'>
                    <span >
                        <img alt='check' src='/images/check.png' />
                    </span>
                    <p>Transaction Successful</p>
                    <strong>
                        Please Kindly be patient as your payment will reflect in 5min. Thank you.
                    </strong>
                </div>
            }
        </form>


    )
}

export default FundingPayment