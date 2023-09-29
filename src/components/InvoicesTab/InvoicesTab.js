import React from 'react'
import { NavLink } from 'react-router-dom'
import './InvoicesTab.css'

const InvoicesTab = () => {
  return (
    <div className='invoiceTab'>
        <ul>
            <li>
                <NavLink to='/invoices/all-invoices' activeclassname="active">
                    All Invoices 
                </NavLink>
            </li>
            <li>
                <NavLink to='/invoices/unpaid-invoices' activeclassname="active">
                    Unpaid Invoices 
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default InvoicesTab