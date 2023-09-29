import React from 'react'
import './allInvoice.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
import { useLocalState } from '../../utils/useLocalStorage'

const Allinvoices = (props) => {
  const [jwt, setJwt] = useLocalState('', 'jwt')
  const [allInvoices, setAllInvoices] = useState({})
  const [isInvoice, setIsInvoice] = useState(false)

    useEffect(()=>{
        axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-invoices', {
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
        .then(res=>{
            console.log(res.data.data)
            setAllInvoices(res.data.data)
            if(res.data.data.length > 0){
            setIsInvoice(true)
            }else setIsInvoice(false)
        })
        .catch(err=>{
            console.log(err)
            setIsInvoice(false)
        })
    }, [])


  return (
    <div className='allInvoices'>
         <div className='Unpaid_con'>
    <div className='Unpaid'>
       <h1>
            All Invoices
        </h1>
        <table className='table'>
            <thead>
                <tr>
                <td>Date</td>
                    <td>Name</td>
                    <td>Amount</td>
                    <td>Status</td>
                    <td>Invoice</td>
                </tr>
            </thead>
        </table>
        <table className="Unpaiddata">
        <tbody>
            {
                isInvoice && allInvoices.map(item=>{
                    return  <tr key={item.date} className="table-data">
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.amt}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link
                        to="invoices/paid-invoice"
                        state={item.uuid}
                        style={{ color: "green" }}
                      >
                        {" "}
                        View
                      </Link>
                    </td>
                  </tr>
                })
            }
            {
                !isInvoice && <tr style={{textAlign: 'center'}}>
                   <td>You do not have any Invoice.</td> 
                </tr>
            }
        </tbody>
      </table>
    </div>
    </div>
   
    </div>
  )
}

export default Allinvoices