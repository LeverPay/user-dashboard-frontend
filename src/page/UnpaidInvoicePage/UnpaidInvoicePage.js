import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocalState } from '../../utils/useLocalStorage'
import { Link } from 'react-router-dom'
// import table from "react-bootstrap/Table";
import './UnpaidInvoicePage.css'

function UnpaidInvoicePage() {

  const [data, setData] = useState({})
  const [isdata, setIsdata] = useState(false)
  const [jwt, setJwt] = useLocalState('', 'jwt')

  useEffect(()=>{
    axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-invoices?status=pending', {
      headers: {
        Authorization : `Bearer ${jwt}`
      }
    })
    .then(res=>{
      console.log(res.data)
      setData(res.data.data)
      if(res.data.data.length > 0){
        setIsdata(true)
      }else setIsdata(false)
    })
    .catch(err=>{
      console.log(err)
      setIsdata(false)
    })
  }, [])

 
  return (
    <div className='Unpaid_con'>
    <div className='Unpaid'>
       <h1>
            Unpaid Invoices
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
                isdata && data.map(item=>{
                    return  <tr key={item.date} className="table-data">
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.amt}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link
                        to="invoices/unpaid-invoice"
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
                !isdata && <tr style={{textAlign: 'center'}}>
                   <td>You do not have any Pending Invoice.</td> 
                </tr>
            }
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default UnpaidInvoicePage