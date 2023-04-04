import React, { useState } from "react";
// import Invoice from "../InvoivePage/Invoice";
import { allTransactions } from "../../TestData";
import Invoice from './Invoice/Invoice'
import { nanoid } from 'nanoid'

function InvoicePage() {

  const [id] = useState(nanoid)
  
  const Transaction_Information = allTransactions.data

  const transactionInvoice = Transaction_Information.map(items=>{
    return <Invoice
      key = {id}
      name = {items.name.productType}
      Company = {items.name.productDetail}
      productType = {items.type}
      amt = {items.amount}
      status = {items.status}
    />
})

  return(
    <>{transactionInvoice}</>
  )
}

export default InvoicePage;
