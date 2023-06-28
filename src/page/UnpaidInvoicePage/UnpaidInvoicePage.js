import React from 'react'
import UnpaidData from '../../TestData/UnpaidData'
import UnpaidInvoice from '../../components/UnpaidInvoice/UnpaidInvoice'
// import table from "react-bootstrap/Table";
import './UnpaidInvoicePage.css'

function UnpaidInvoicePage() {

  console.log(UnpaidData)
  const info = UnpaidData.map(item=>{ 
    return <UnpaidInvoice 
     key = {item.id}
     name = {item.Name}
     type = {item.type}
     amt = {item.amount}
     status = {item.status} 
     date = {item.date}
    />
  })
 
  return (
    <div className='Unpaid_con'>
    <div className='Unpaid'>
       <h1>
            Unpaid Invoices
        </h1>
        <table className='table'>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Type</td>
                    <td>Amount</td>
                    <td>Status</td>
                    <td>Date</td>
                </tr>
            </thead>
        </table>
              {info}
    </div>
    </div>
  )
}

export default UnpaidInvoicePage