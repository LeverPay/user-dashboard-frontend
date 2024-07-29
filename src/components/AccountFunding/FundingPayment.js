import React, { useEffect, useState } from "react";
import FundingInitiating from "./FundingInitiating";
import FundingSuccess from "./FundingSuccess";
import Helpimageupload from "../HelpImageUpload/helpimageupload";

const FundingPayment = ({ handleAmount }) => {
    const [exchange, setExchange] = useState("Binance");
    const [step, setStep] = useState(1);
    const [copAlert, setCopyAlert] = useState("");
    const [copAlert2, setCopyAlert2] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkTxid, setCheckTxid] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [txidCredentialsValid, setTxidCredentialsValid] = useState(false);
    const [txidValid, setTxidValid] = useState(false);
    const [proceed, setProceed] = useState(false);
    const [addInfoNet, setAddInfoNet] = useState(false);
    const [addInfoTxid, setAddInfoTxid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Image upload
    const [fileImg, setFileimg] = useState();
    const [imgfile, setImgfile] = useState();

    const GetImg = (value, imgInfo) => {
        setFileimg(value);
        setImgfile(imgInfo);
    };

    const networkOptions = [
        { value: 'BSC', label: 'BSC' },
        { value: 'ETH(ERC20)', label: 'ETH' },
        { value: 'POLYGON', label: 'POLYGON' }
    ];

    const walletAddresses = [
        { network: 'BSC', value: 've12evw784vwfg4b74vsjb' },
        { network: 'ETH', value: 'ghrs2evw784vwfg4b74vsjb' },
        { network: 'POLYGON', value: '22ERYevw784vwfg4b74vsjb' }
    ];
    
    const [selectedAddress, setSelectedAddress] = useState(walletAddresses[0].value);

    const [formData, setFormData] = useState({
        amount: "",
        userID: "16yge73ghuyw",
        network: networkOptions[0].value,
        txid: '',
        fileImg: fileImg,
        imginfo: imgfile
    });

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setCheckTxid(true);
    };

    useEffect(() => {
        const address = walletAddresses.find(wallet => wallet.network === formData.network)?.value;
        setSelectedAddress(address);
    }, [formData.network]);

    const usdt = Number(formData.amount) + Number(formData.amount * 0.015);
    const vat = Number(formData.amount) * 0.015;

    useEffect(() => {
        handleAmount(usdt.toFixed(2));
    }, [formData.amount, handleAmount]);


    // const handleStep = () => {
    //     if ((step === 2 || step === 5) && formData.amount <= 0) {
    //       setErrorMessage('Please enter an amount to proceed.');
    //       return;
    //     }
    //     //Reset error message to none
    //     setErrorMessage('');
    
    //     if (step === 3 && !formData.txid) {
    //       setAddInfo('Provide your transaction id');
    //     } else if (step === 3) {
    //       submitTopupRequest();
    //     } else {
    //       setStep((prevStep) => prevStep + 1);
    //     }
    // };
    

    const handleNextStep = () => {
        if((step === 2) && formData.handleAmount <= 0){
            setErrorMessage('Please enter an amount to proceed.');
            return;
        }
        setErrorMessage("");
        setStep(step + 1);

    };
    const handlePrevStep = () => setStep(step - 1);

    const handleExchangeChange = (e) => setExchange(e.target.value);

    useEffect(() => {
        if (formData.txid.length > 10) {
            setLoading(checkTxid);
        }
    }, [formData.txid.length, checkTxid]);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setShowModal(!txidValid);
                setTxidCredentialsValid(true);
                setLoading(false);
            }, 3000);
        }
    }, [loading, txidValid]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleNextStep();
    };

    const handleCopy = (text, alertSetter) => {
        navigator.clipboard.writeText(text);
        alertSetter("copied");
    };

    const handleModalConfirmation = () => {
        setCheckTxid(false);
        setShowModal(false);
        setProceed(true);
    };

    return (
        <form className="StableCoinFunding">
            {step === 1 && (
                <div className='FundingPayment'>
                    <h2>Select your Crypto Exchange to proceed!</h2>
                    <main>
                        <ul>
                            {["Binance", "CoinBase", "Huobi", "Luno"].map(exchangeName => (
                                <li key={exchangeName}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="exchange"
                                            value={exchangeName}
                                            checked={exchange === exchangeName}
                                            onChange={handleExchangeChange}
                                            onClick={handleNextStep}
                                        />
                                        {exchangeName}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </main>
                </div>
            )}
            {step === 2 && (
                <div className='FundingAmount'>
                    <FundingInitiating exchange={exchange} />
                    <main>
                        <div className='FundingAmt'>
                            <label htmlFor='amount' style={{ color: '#31353A' }}>Enter Amount</label>
                            <input
                                type='number'
                                placeholder='250.00'
                                name='amount'
                                className="amts"
                                value={formData.amount}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className='FundingAmt'>
                            <label htmlFor='Vat' style={{ color: '#CD4729' }}>Conversion fee (1.5%)</label>
                            <input
                                type='text'
                                placeholder='10.00'
                                name='Vat'
                                value={vat.toFixed(2)}
                                onChange={handleFormChange}
                            />
                        </div>
                    </main>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button onClick={handleNextStep}>Proceed</button>
                    <span onClick={handlePrevStep} className='FundingCancel'>
                        <img alt='' src='/images/cancel.png' />
                    </span>
                </div>
            )}
            {step === 3 && (
                <div className='FundingAmount' style={{ opacity: loading ? '.5' : '1' }}>
                    <FundingInitiating exchange={exchange} />
                    <main>
                        <div className='FundingAmt'>
                            <label htmlFor='userID' style={{ color: '#31353A' }}>
                                LeverPay UserID <span>Please include this as your narration</span>
                            </label>
                            <input
                                type='text'
                                name='userID'
                                value={formData.userID}
                                onChange={handleFormChange}
                                disabled
                                style={{ color: 'black', fontSize: '18px', fontWeight: '700' }}
                            />
                            <img
                                alt='copy'
                                src='/images/copy2.png'
                                id='fundTxidCopy'
                                onClick={() => handleCopy(formData.userID, setCopyAlert)}
                            />
                            <span>{copAlert}</span>
                        </div>
                        <div className='FundingAmt'>
                            <span className="add_info" style={{ display: addInfoNet ? 'block' : 'none' }}>
                                <small>Each network has its own unique address. Make sure to confirm the network on your exchange before funding.</small>
                            </span>
                            <label htmlFor='network' style={{ color: '#31353A' }}>
                                Select network
                                <img
                                    alt="info"
                                    src="/images/info.png"
                                    onMouseOver={() => setAddInfoNet(!addInfoNet)}
                                    onMouseLeave={() => setAddInfoNet(!addInfoNet)}
                                />
                            </label>
                            <select
                                value={formData.network}
                                onChange={handleFormChange}
                                name="network"
                                id="network"
                            >
                                {networkOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='FundingAmt'>
                            <label htmlFor='address' style={{ color: '#CD4729' }}>LeverPay Wallet Address</label>
                            <input
                                type='text'
                                name='address'
                                value={selectedAddress}
                                onChange={handleFormChange}
                                style={{ color: 'black', fontSize: '18px', fontWeight: '700' }}
                            />
                            <img
                                alt='copy'
                                src='/images/copy2.png'
                                id='fundTxidCopy'
                                onClick={() => handleCopy(selectedAddress, setCopyAlert2)}
                            />
                            <span>{copAlert2}</span>
                        </div>
                        <div className='FundingAmt'>
                            <span className="add_info" style={{ display: addInfoTxid ? 'block' : 'none' }}>
                                <small>Make sure to provide your Transaction ID(TXID) before proceeding. You can find this in your transaction receipt.</small>
                            </span>
                            <label htmlFor='txid'>
                                Transaction Reference
                                <img
                                    alt="info"
                                    src="/images/info.png"
                                    id='info'
                                    onMouseOver={() => setAddInfoTxid(!addInfoTxid)}
                                    onMouseLeave={() => setAddInfoTxid(!addInfoTxid)}
                                />
                            </label>
                            <input
                                type='text'
                                name='txid'
                                value={formData.txid}
                                onChange={handleFormChange}
                                className="txReference"
                                placeholder="Please enter your reference ID"
                                style={{ color: 'black', fontWeight: '700', opacity: loading ? '0.5' : '1' }}
                            />
                            {loading && <img alt="loading" src="/images/loading.png" className="loading" />}
                            {txidCredentialsValid && <img alt="loaded" src="/images/checkmate.png" className="loading" style={{ animation: 'none' }} />}
                        </div>
                        <div className="screenshot">
                            <Helpimageupload GetfileImg={GetImg} optional={false} />
                        </div>
                    </main>
                    <button onClick={handleFormSubmit} disabled={!proceed}>Proceed</button>
                    <span onClick={handlePrevStep} className='FundingCancel'>
                        <img alt='' src='/images/cancel.png' />
                    </span>
                </div>
            )}
            {step === 4 && <FundingSuccess />}
            {showModal && (
                <div className="tx_confirm_msg">
                    <p>
                        {txidValid
                            ? `The information on the transaction reference shows ${usdt} as the total amount paid while the conversion fee (1.5%) is ${vat.toFixed(2)}. Therefore your total funding amount is ${formData.amount}. Click Okay to Continue`
                            : "Transaction reference does not exist or is not valid"
                        }
                    </p>
                    <button onClick={handleModalConfirmation}>Okay</button>
                </div>
            )}
        </form>
    );
};

export default FundingPayment;
