import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './fundingComponents.css'


const FundingNav2 = () => {
  return (
    <nav className='FundNavigation'>
        <ul>
            <li>
                <NavLink activeclassname ='active' to='/funding/stablecoins-deposit'>
                    Stable Coin
                </NavLink>
            </li>
            <li>
                <NavLink activeclassname ='active' to='/funding/naira-deposit'>
                    Naira
                </NavLink>
            </li>
            <li>
                <NavLink activeclassname ='active' to='/funding/paystack-deposit'>
                    PayStack
                </NavLink>
            </li>
            <li>
                <NavLink activeclassname ='active' to='/funding/more'>
                    More
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default FundingNav2