import React, { useState } from 'react';
import Referral from './Referral';
import ReferralList from './ReferralList';

const ReferralContainer = () => {
    const [activeTab, setActiveTab] = useState('referralCode');

    return (
        <div className='referral-container'>
            <ul className='tabs'>
                <li onClick={() => setActiveTab('referralCode')} className={activeTab === 'referralCode' ? 'active' : ''}>
                    Referral Code
                </li>
                <li onClick={() => setActiveTab('referralList')} className={activeTab === 'referralList' ? 'active' : ''}>
                    Referral List
                </li>
            </ul>
            {activeTab === 'referralCode' && <Referral />}
            {activeTab === 'referralList' && <ReferralList />}
            
        </div>
    );
};

export default ReferralContainer;
