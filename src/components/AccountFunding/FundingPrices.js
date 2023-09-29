import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocalState } from '../../utils/useLocalStorage'


export const FundingPrices = (props) => {
  const [jwt, setJwt] = useLocalState('', 'jwt')
  const [rate, setRate] = useState('')
    useEffect(()=>{
    axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-exchange-rates',  {
          headers: {
              Authorization : `Bearer ${jwt}`
          }
      })
        .then(res=>{
          console.log(res.data.data)
          setRate(res.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
      },[])
    const {amt} = props 
    console.log(typeof(amt))
    let Naira = Number(amt * rate.rate)
    const dollar = amt * 1

  return (
    <div className='FundingPrices'>
        <main style={{backgroundColor: '#0B0230'}}>
            <span className='priIcon'>
            <img alt="" src="/images/bal1.png"/>
            </span>
        <div>
            <h4>USDT EQUIVALENT</h4>
            <p>{amt? dollar.toFixed(2):'0'} USDT</p>
        </div>
        </main>
        <main style={{backgroundColor: '#329521'}}>
            <span className='priIcon'>
            <img alt="" src="/images/bal1.png"/>
            </span>
        <div>
            <h4>NAIRA EQUIVALENT</h4>
            <p>N {Naira ? Naira.toFixed(2): '0'} </p>
        </div>
        </main>
    </div>
  )
}
