import React, { useState } from "react";
import "./FundingPage.css";
import FundingNav from "../../components/AccountFunding/FundingNav";
import { FundingPrices } from "../../components/AccountFunding/FundingPrices";
import FundingTabs from "../../components/AccountFunding/FundingTabs";
import FundingPayment from "../../components/AccountFunding/FundingPayment";
import {Route, Routes } from "react-router-dom";
import FundingNaira from "../../components/AccountFunding/FundingNaira";
import FundingPaystack from "../../components/AccountFunding/FundingPaystack";
import FundingMore from "../../components/AccountFunding/FundingMore";

const FundingPage = () => {
    const [amt, setAmt] = useState('')
    function handleAmount(amts){
        setAmt(amts)
    }

  return (
    <div className='Fundingpage'>
        <section>
            <FundingNav/>
        </section>
        <section>
            <FundingPrices amt = {amt} />
        </section>
        <section>
            <FundingTabs/>
        </section>
        <section>
          <Routes>
            <Route index element={<FundingPayment handleAmount = {handleAmount} amt = {amt}  />} />
            <Route path="stablecoins-deposit" element={<FundingPayment handleAmount = {handleAmount} amt = {amt} />} />
            <Route path="naira-deposit" element={<FundingNaira handleAmount = {handleAmount} amt = {amt}  />} />
            <Route path="more" element={<FundingMore />} />
        </Routes>
      </section>
    </div>
  );
};

export default FundingPage;
