import React from 'react'
import './AllTransactions.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocalState } from '../../utils/useLocalStorage'
import { Link } from 'react-router-dom'

const AllTransactions = () => {
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [data, setData] = useState({})
    const [isdata, setIsdata] = useState(false)
    const baseurl = 'https://leverpay-api.azurewebsites.net/api/v1/user/get-user-transactions'
  useEffect(() => {
    axios.get(baseurl, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data)
        if(res.data.data.length > 0){
            setIsdata(true)
        }else setIsdata(false)
      })
      .catch(error => {
        console.log(error)
        setIsdata(false)
      })
  }, [])
  return (
    <div className='allTransactions'>
        <header>
            <h1>
                Recent Transaction 
            </h1>
            <div>
            <button>
                <Link to='/transactions'>
                View all 
                </Link>     
            </button>
            <Link to="/customer-support">
            <small style={{ color: "#fff", fontSize: "12px" }}>
              Need help ?
            </small>
          </Link>
            </div>
          
        </header>
        <main>
            <ul className='allTransactions-head'>
                <li>NAME/BUSINESS</li>
                <li>TYPE</li>
                <li>AMOUNT</li>
                <li>STATUS</li>
                <li>DATE</li>
            </ul>
            {
                isdata && data.map(item=>{
                    return  <ul className='allTransactionBody' key={item.date} >
                    <li>{item.name}</li>
                    <li>{item.type}</li>
                    <li>{item.amount}</li>
                    <li>{item.status}</li>
                    <li>{item.date}</li>
                </ul>
                })
            }
            {
                !isdata && <h3>No Transactions</h3>
            }
           
        </main>
    </div>
  )
}

export default AllTransactions