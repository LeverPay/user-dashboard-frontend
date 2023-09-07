import React from 'react'
import { useState, useEffect } from 'react'

export const FundingPrices = (props) => {

    const {amt} = props 
    let Naira = Number(amt * 750)
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
            <h4>NAIRA EQUIVALENT</h4>
            <p>N {Naira.toFixed(2)} </p>
        </div>
        </main>
    </div>
  )
}
