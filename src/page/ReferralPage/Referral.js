import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Referral.css";
import SpinnerGif from "../../assets/spinner-gif.gif";
import { FaCircleCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useLocalState } from "../../utils/useLocalStorage";

const Referral = () => {
    const [jwt] = useLocalState("", "jwt");
    const [referralCode, setReferralCode] = useState('');
    const [codeDetails, setCodeDetails] = useState({ total_point: 0, referral_bonus: 0 });
    const [referrals, setReferrals] = useState([]);
    const [copy, setCopy] = useState('');
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReferralCode = async () => {
            try {
                const res = await axios.get("https://leverpay-api.azurewebsites.net/api/v1/user/get-referral-code", {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
                console.log(res.data);
                setReferralCode(res.data.referral_code);
                setCodeDetails(res.data);
            } catch (error) {
                console.log("Error fetching referral code:", error);
            }
        };

        fetchReferralCode();
        fetchReferrals();
    }, [jwt]);

    const fetchReferrals = async () => {
        try {
            const response = await axios.get("https://leverpay-api.azurewebsites.net/api/v1/user/get-referrals", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log(response.data);
            setReferrals(response.data.data || []);
        } catch (error) {
            console.log("Error fetching referrals:", error);
        }
    };

    const handleClaimBonus = () => {
        const inputData = { 
            amount: codeDetails.total_point 
        };
        setLoading(true);
        
        axios.post('https://leverpay-api.azurewebsites.net/api/v1/user/claim-referral-bonus', inputData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`
                }
            })
            .then((response)=>{
                console.log('Response received', response.data)
                setMessage(response.data.message);
                setMessageType(response.data.success ? 'success' : 'error');
                setShowMessage(true)

                fetchReferrals();
                setLoading(false);
                if (response.data.success) {
                    console.log("Credited Successfully")
                    setCodeDetails(codeDetails.referral_bonus)
                }

            })
            .catch((error) => {
                console.log("Error claiming bonus:", error);
                setMessage('You do not have access to claim this point yet');
                setMessageType('error')
                setShowMessage(true)
                setLoading(false);

            });        
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopy('Copied!');
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };


    return (
        <div className='referral'>
            <div className="referral-intro">
                <h3>Your Referral <strong>Token</strong></h3>
                <h4 className='points'>
                    <span>N</span> {codeDetails.referral_bonus} Point Earned
                </h4>
            </div>
            <div className='referral-code'>
                <span className='code'>{referralCode}</span>
                <span>
                    <img alt="copy" src='/images/copy-white.png' onClick={() => copyToClipboard(referralCode)} />
                    {" "}{copy}
                </span>
            </div>

            {referrals.length > 0 ? (
                <div className='referral-code claim'>
                    <div className='input-field'>
                        <input
                            type="number"
                            name="referralPoints"
                            value={codeDetails.total_point}
                            readOnly
                        />
                        <label>
                            Point
                        </label>
                    </div>

                    {loading ? <img src={SpinnerGif} alt="spinner-gif" /> : ""}
                    <button
                        onClick={handleClaimBonus}
                        disabled={codeDetails.total_point <= 0 || loading}
                    >
                        Claim now
                    </button>
                </div>
            ) : (
                <div>No referrals yet.</div>
            )}

            {showMessage && (
                messageType === 'success' ? (
                    <div className="message success">
                        <span className="close-button" onClick={handleCloseMessage}>
                            <FaTimes size={20} />
                        </span>
                        <div className='block py-2'>
                            <FaCircleCheck size={50}/>
                        </div>
                        <div className='py-4'>{message}</div>
                        <div className='referral-info'>
                            Keep referring in order to keep earning more points which you can use to shop online.
                        </div>
                    </div>
                ) : (
                    <div className="message error">
                        <span className="close-button" onClick={handleCloseMessage}>
                            <FaTimes size={20} />
                        </span>
                        <img src='/images/cancel.png' alt=""/>
                        {message}
                    </div>
                )
            )}


            <div className='referral-info'>
                Keep referring in order to keep earning more points which you can use to shop online.
            </div>
        </div>
    );
};

export default Referral;
