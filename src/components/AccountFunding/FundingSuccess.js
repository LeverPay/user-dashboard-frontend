import React from 'react'
import { Link } from 'react-router-dom'
import './fundingComponents.css'

const FundingSuccess = () => {
  return (
    <div className='fundingSuccess'>
                    <span >
                        <img alt='check' src='/images/check.png' />
                    </span>
                    <p>Transaction Successful</p>
                    <strong>
                        Please be patient as your payment will reflect in 5min. Thank you.
                    </strong>
                    <button>
                        Download Receipt
                    </button>
                    <Link to='/' className="returnToDashboard">
                       Back to Dashboard
                    </Link>
                </div>
  )
}

export default FundingSuccess