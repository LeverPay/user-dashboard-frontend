import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalState } from '../../utils/useLocalStorage';

export const FundingPrices = ({ amt }) => {
  const [jwt] = useLocalState('', 'jwt')
  const [rate, setRate] = useState('')


  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://leverpay-api.azurewebsites.net/api/v1/user/get-exchange-rates', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("DATA Response:", response);
        setRate(response.data.data);
      } catch (error) {
        console.log('Error fetching exchange rates:', error);
      }
    };
    fetchExchangeRates();
  }, [jwt]);

  const naira = amt ? (amt * rate.rate).toFixed(2) : '0';
  const dollar = amt ? (amt * 1).toFixed(2) : '0'
  // const dollar = amt * 1

  return (
    <div className='FundingPrices'>
        <main style={{backgroundColor: '#0B0230'}}>
            <span className='priIcon'>
            <img alt="" src="/images/bal1.png"/>
            </span>
        <div>
            <h4>USDT EQUIVALENT</h4>
            <p>{dollar} USDT</p>
        </div>
        </main>
        <main style={{backgroundColor: '#329521'}}>
            <span className='priIcon'>
            <img alt="" src="/images/bal1.png"/>
            </span>
        <div>
            <h4>NAIRA EQUIVALENT</h4>
            <p>N {naira} </p>
        </div>
        </main>
    </div>
  )
}
