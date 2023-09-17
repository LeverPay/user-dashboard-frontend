import React from 'react'
import './UnpaidInvoice.css'
import Invoice from '../../page/InvoicePage/Invoice/Invoice'
import { useLocation } from 'react-router-dom'

const UnpaidReceipt = (props) => {
  const location = useLocation()
  const { state } = location
  const data = state
  console.log(state)
  return (
    <Invoice
        name = {data.name}
        productType={data.type}
        amt = {data.amt}
        status = {data.status}
        unpaid = {true}
        date = {data.date}
        cancel = 'invoices'

    />
  )
}

export default UnpaidReceipt