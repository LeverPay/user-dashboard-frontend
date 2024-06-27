import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalState } from '../../utils/useLocalStorage';
import { Link } from 'react-router-dom';
import './AllTransactions.css';

const RecentTransactions = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [transactions, setTransactions] = useState([]);
  const [isData, setIsData] = useState(false);

  const baseurl = 'https://leverpay-api.azurewebsites.net/api/v1/user/get-user-transactions';

  useEffect(() => {
    axios.get(baseurl, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then((res) => {  
      const recentTransactions = res.data.data.slice(0, 3);
      setTransactions(recentTransactions);
      setIsData(recentTransactions.length > 0);
    })
    .catch(error => {
      console.log(error);
      setIsData(false);
    });
  }, [jwt]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className='allTransactions'>
      <header>
        <h1>Recent Transactions</h1>
        <button>
          <Link to='/transactions'>
            View all &gt; 
          </Link>
        </button>
        
      </header>
      <main>
        <ul className='allTransactions-head'>
          <li>NAME/BUSINESS</li>
          <li>TYPE</li>
          <li>AMOUNT</li>
          <li>STATUS</li>
          <li>DATE</li>
        </ul>
        {isData ? (
          transactions.map((item) => (
            <ul className='allTransactionsBody' key={item.created_at}>
              <li>{item.merchant}</li>
              <li>{item.type}</li>
              <li>{Number(item.amount).toFixed(2)}</li>
              <li style={{ color: item.status === 0 ? '#F79E1B' : item.status === 1 ? '#329521' : 'red' }}>
                {item.status === 0 ? 'Pending' : item.status === 1 ? 'Successful' : 'Failed'}
              </li>
              <li>{formatDate(item.created_at)}</li>
            </ul>
          ))
        ) : (
          <h3>No Transactions</h3>
        )}
      </main>
    </div>
  );
};

export default RecentTransactions;
