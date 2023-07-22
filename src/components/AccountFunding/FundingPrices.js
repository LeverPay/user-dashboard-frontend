import React from 'react'
import { useState, useEffect } from 'react'

export const FundingPrices = () => {

    const [amt, setAmt] = useState('')

    useEffect(()=>{
        const Amount = localStorage.getItem('amt')
        if(Amount){
            return setAmt(Amount)
        }
    },[])

    // const amt = localStorage.getItem('amt')
    console.log(amt)
  return (
    <div className='FundingPrices'>
        <main style={{backgroundColor: '#0B0230'}}>
            <span className='priIcon'>
            <img alt="" src="/images/bal1.png"/>
            </span>
        <div>
            <h4>USDT EQUIVALENT</h4>
            <p>{amt} USDT</p>
        </div>
        </main>
        <main style={{backgroundColor: '#329521'}}>
            <span className='priIcon'>
            <img alt="" src="/images/bal1.png"/>
            </span>
        <div>
            <h4>MONEY EQUIVALENT</h4>
            <p>N0.00 </p>
        </div>
        </main>
    </div>
  )
}
