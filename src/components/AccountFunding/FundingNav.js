import React from 'react'
import { Link } from 'react-router-dom'
import './fundingComponents.css'

const FundingNav = () => {
  return (
    <nav className='FundingNav'>
        <h3>
            Fund Your Account With !
        </h3>
        <img src='/images/fundingIcon.png' className='FundingNavIcon' alt='' />
        <Link to='/funding-history'>
         View History ?
        </Link>
    </nav>
  )
}

export default FundingNav