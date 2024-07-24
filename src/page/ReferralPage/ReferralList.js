import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalState } from "../../utils/useLocalStorage";

const ReferralList = () => {
    const [jwt] = useLocalState("", "jwt");
    const [referrals, setReferrals] = useState([]);
    
    useEffect(() => {
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

        fetchReferrals();
    }, [jwt]);

    return (
        <div className='referral-list'>
            {referrals.length > 0 ? (
                <ul>
                    {referrals.map((referral, index) => (
                        <li key={index}>
                            <div>Date: {referral.created_at}</div>
                            <div>Name: {referral.first_name.toUpperCase()} {referral.last_name.toUpperCase()}</div>
                            <div>Email: {referral.email}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No referrals found.</div>
            )}
        </div>
    );
};

export default ReferralList;
