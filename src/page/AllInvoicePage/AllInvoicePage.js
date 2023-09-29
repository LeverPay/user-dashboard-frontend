import React from 'react'
import InvoicesTab from '../../components/InvoicesTab/InvoicesTab'
import { Outlet } from 'react-router-dom'
import './AllInvoicePage.css'

const AllInvoicePage = () => {
  return (
    <div className='allInvoicePage'>
        <InvoicesTab/>
        <Outlet/>
    </div>
  )
}

export default AllInvoicePage