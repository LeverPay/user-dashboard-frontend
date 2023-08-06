import React, { useEffect, useState } from "react";
import FundingInitiating from "./FundingInitiating";
import { Link } from "react-router-dom";
import FundingCancel from "./FundingCancel";

const FundingPayment = (props) => {
    console.log(props);
    const [exchange, setExchange] = useState("Binance");
    const [step, setStep] = useState(1);
    const [copAlert, setCopyAlert] = useState("");

    
    const network =  [
        {value : 'BSC', label : 'BSC'},
        {value : 'ETH(ERC20)', label : 'ETH'},
        {value : 'POLYGON', label : 'POLYGON'}
    ]

    const wallets = [
        {network : 'BSC', value: 've12evw784vwfg4b74vsjb' },
        {network : 'ETH', value: 'ghrs2evw784vwfg4b74vsjb' },
        {network : 'POLYGON', value: '22ERYevw784vwfg4b74vsjb' }
    ]
    const [selectedAddress, setSelectedAddress] = useState(wallets[0].value) 


    const [formData, setFormData] = useState({
        amount: "",
        userID: "16yge73ghuyw",
        network : network[0].value
    });


    function handleForm(e) {
        setFormData({
            ...formData,
            network : e.target.value,
            [e.target.name]: e.target.value
        })

    }
    useEffect(()=>{
        if(formData.network === network[0].value){
            setSelectedAddress(wallets[0].value)
        }else if(formData.network === network[1].value){
            setSelectedAddress(wallets[1].value)
        }else if(formData.network === network[2].value){
            setSelectedAddress(wallets[2].value)
        }
    }, [formData.network])

    useEffect(() => {
        const usdt = Number(formData.amount) + Number(formData.amount * 0.015) 
        props.handleAmount(usdt.toFixed(2))
    }, [handleForm])

    const Vat = Number(formData.amount) * 0.015

    function NextStep() {
        return setStep(step + 1);
    }
    function PrevStep() {
        setStep(step - 1);
    }
    function copyAcct() {
        navigator.clipboard.writeText(formData.txid);
        setCopyAlert("copied");
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
                            <label htmlFor='Vat' style={{ color: '#CD4729' }}>Vat (1.5%)</label>
                            <input
                                type='text'
                                placeholder='10.00'
                                name='Vat'
                                value={Vat.toFixed(2)}
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
                            <label htmlFor='userID' style={{ color: '#31353A' }}>LeverPay UserID <span>Please include this as your narration</span> </label>
                            <input
                                type='text'
                                name='userID'
                                value={formData.userID}
                                onChange={handleForm}
                                disabled={true}
                                style={{ color: 'black', fontSize: '18px', fontWeight: '700' }}
                            />
                             <img alt='copy' src='/images/copy2.png' id='fundTxidCopy1' onClick={copyAcct} />
                             <span id='txidcopy1'>{copAlert}</span>
                        </div>
                        <div className='FundingAmt'>
                            <label htmlFor='network' style={{ color: '#31353A' }}>Select network</label>
                            <select 
                             value={formData.network}
                             onChange={handleForm}
                             name="network"
                             id="network"
                            >
                                {
                                    network.map(option => {
                                        return (
                                            <option key={option.value} value={option.value} name = 'network' >
                                               {option.value} 
                                            </option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className='FundingAmt'>
                            <label htmlFor='txid' style={{ color: '#CD4729' }}>LeverPay Wallet Address</label>
                            <input
                                type='text'
                                name='txid'
                                value={selectedAddress}
                                onChange={handleForm}
                                style={{ color: 'black', fontSize: '18px', fontWeight: '700' }}
                            />
                            <img alt='copy' src='/images/copy2.png' id='fundTxidCopy' onClick={copyAcct} />
                            <span id='txidcopy'>{copAlert}</span>
                        </div>
                    </main>
                    <button onClick={handleformSubmit}>Make payment before you Proceed</button>
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
                        Please be patient as your payment will reflect in 5min. Thank you.
                    </strong>
                    <Link to='/' className="returnToDashboard">
                       Back to Dashboard
                    </Link>
                </div>
            }
        </form>
    )
}
export default FundingPayment;
