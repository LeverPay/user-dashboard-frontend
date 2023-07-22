import React from 'react'
import './FundingPage.css'
import FundingNav from '../../components/AccountFunding/FundingNav'
import { FundingPrices } from '../../components/AccountFunding/FundingPrices'
import FundingNav2 from '../../components/AccountFunding/FundingNav2'
import FundingPayment from '../../components/AccountFunding/FundingPayment'
import FundingInitiating from '../../components/AccountFunding/FundingInitiating'
import { Outlet,Route,Routes } from 'react-router-dom'
import FundingNaira from '../../components/AccountFunding/FundingNaira'
import FundingPaystack from '../../components/AccountFunding/FundingPaystack'
import FundingMore from '../../components/AccountFunding/FundingMore'

const FundingPage = () => {
  return (
    <div className='Fundingpage'>
        <section>
            <FundingNav/>
        </section>
        <section>
            <FundingPrices/>
        </section>
        <section>
            <FundingNav2/>
        </section>
        <section>
            <Outlet/>
        </section>

    </div>
  )
}

export default FundingPage