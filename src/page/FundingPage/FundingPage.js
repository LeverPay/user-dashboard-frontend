import React, { useState } from 'react'
import './FundingPage.css'
import FundingNav from '../../components/AccountFunding/FundingNav'
import { FundingPrices } from '../../components/AccountFunding/FundingPrices'
import FundingNav2 from '../../components/AccountFunding/FundingNav2'
import FundingPayment from '../../components/AccountFunding/FundingPayment'
import { Outlet,Route,Routes } from 'react-router-dom'
import FundingNaira from '../../components/AccountFunding/FundingNaira'
import FundingPaystack from '../../components/AccountFunding/FundingPaystack'
import FundingMore from '../../components/AccountFunding/FundingMore'

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
            <FundingNav2/>
        </section>
        <section>
            {/* <Outlet amts = {amt} /> */}
            <Routes>
            <Route index element={<FundingPayment/>} />
          <Route path="stablecoins-deposit" element={<FundingPayment handleAmount = {handleAmount}  />} />
          <Route path="naira-deposit" element={<FundingNaira />} />
          <Route path="paystack-deposit" element={<FundingPaystack />} />
          <Route path="more" element={<FundingMore />} />
            </Routes>
        </section>

    </div>
  )
}

export default FundingPage