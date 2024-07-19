import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Referral.css";
import SpinnerGif from "../../assets/spinner-gif.gif";
import { useLocalState } from "../../utils/useLocalStorage";

const Referral = () => {
    const [jwt] = useLocalState("", "jwt");
    const [referralCode, setReferralCode] = useState('');
    const [codeDetails, setCodeDetails] = useState({ total_point: 0, referral_bonus: 0 });
    const [referrals, setReferrals] = useState([]);
    const [copy, setCopy] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [claimPoints, setClaimPoints] = useState('');

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
                setError('Failed to fetch referral code');
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
            setError('Failed to fetch referrals');
        }
    };

    const handleClaimBonus = async () => {
        const inputData = { points: claimPoints };
        try {
            const response = await axios.post('https://leverpay-api.azurewebsites.net/api/v1/user/claim-referral-bonus', inputData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setSubmitted(true);
            setMessage(response.data.message);
            fetchReferrals();
            setSubmitted(false);
            // Clear claimPoints if successful
            if (response.data.success) {
                setClaimPoints('');
            }
        } catch (error) {
            console.log("Error claiming bonus:", error);
            setMessage('You do not have access to claim this point yet');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopy('Copied!');
    };

    return (
        <div className='referral'>
            <div className="referral-intro">
                <h3>Your Referral <strong>Token</strong></h3>
                <h4 className='points'>
                    <span>N</span> {codeDetails.referral_bonus.toLocaleString()} Point Earned
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
                    <input
                        type="number"
                        name="referralPoints"
                        value={claimPoints}
                        onChange={(e) => setClaimPoints(e.target.value)}
                    />

                    {submitted ? <span><img src={SpinnerGif} alt="spinner-gif" /></span> : ""}
                    <button
                        onClick={handleClaimBonus}
                        disabled={claimPoints <= 0 || claimPoints > codeDetails.total_point}
                    >
                        Claim now
                    </button>
                </div>
            ) : (
                <div>No referrals yet.</div>
            )}
            
            {message && <div>{message}</div>}

            <div className='referral-info'>
                Keep referring in order to keep earning more points which you can use to shop online.
            </div>
        </div>
    );
};

export default Referral;
