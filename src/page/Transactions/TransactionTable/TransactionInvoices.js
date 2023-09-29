import React from 'react'
import Invoice from '../../InvoicePage/Invoice/Invoice'
import { useLocation, Link } from 'react-router-dom'

const TransactionInvoices = () => {
    const location = useLocation()

    const { state } = location


    const item = state
    return (
        <div 
        style={{
            border: '1px solid ',
            width: '100%',
            margin:'auto',
        }}>
                <Invoice
                    name={item.name}
                    productType={item.type}
                    amt={item.amount}
                    status={item.status}
                    unpaid={false}
                    date={item.date}
                    cancel = 'transactions'
                />
        </div>

    )
}

export default TransactionInvoices