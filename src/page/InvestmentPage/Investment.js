import React from 'react'
import './Investment.css'
import InvestmentForm from '../../components/InvestmentForm/InvestmentForm'
import CheckoutTransfer from '../../components/CheckoutTransfer/CheckoutTransfer'

const Investment = () => {
    return (
        <div className='investmentPage'>
            <img alt='logo' src='/images/logo.png' className='logo' />
            {/* <InvestmentForm /> */}
            <CheckoutTransfer/>
            <img alt='secure' src='/images/secures.png' className='secure' />
        </div>
    )
}

export default Investment