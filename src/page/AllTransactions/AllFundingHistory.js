import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useLocalState } from '../../utils/useLocalStorage'
import './AllTransactions.css'
import { Link } from 'react-router-dom'

const AllFundingHistory = () => {

    const [jwt, setJwt] = useLocalState('', 'jwt')
    const [data, setData] = useState({})
    const [isdata, setIsdata] = useState(false)
    const baseurl = 'https://leverpay-api.azurewebsites.net/api/v1/user/get-topup-requests'
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
            Funding History 
        </h1>
        <div>
        <Link to="/customer-support">
        <small style={{ color: "#fff", fontSize: "12px" }}>
          Need help ?
        </small>
      </Link>
        </div>
      
    </header>
    <main>
        <ul className='allTransactions-head' id='fundingHistory-head'>
            <li>Amount</li>
            <li>Reference</li>
            <li>STATUS</li>
            <li>Date</li>
        </ul>
        {
            isdata && data.map(item=>{
                return  <ul className='allTransactionBody' id='fundingHistory-body' key={item.reference} >
                <li>{item.amount}</li>
                <li>{item.reference}</li>
                <li>{item.status === 0 ? <span style={{color:'#F79E1B'}}>Pending</span> : item.status === 1 ? <span style={{color:'#329521'}}>Completed</span> : <span style={{color: '#FF0606'}}>Cancelled</span> }</li>
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

export default AllFundingHistory