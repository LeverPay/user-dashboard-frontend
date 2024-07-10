import React from 'react'
import { NavLink } from 'react-router-dom'
import './fundingComponents.css'


const FundingTabs = () => {
  return (
    <nav className='FundTabs'>
        <ul>
            <li>
                <NavLink activeclassname ='active' to='/funding/naira-deposit'>
                    Naira
                </NavLink>
            </li>
            <li>
                <NavLink activeclassname ='active' to='/funding/stablecoins-deposit'>
                    Stable Coin
                </NavLink>
            </li>
            <li>
                <NavLink activeclassname ='active' to='/funding/more'>
                    &lt; More
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default FundingTabs