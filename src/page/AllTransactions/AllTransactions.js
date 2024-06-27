import React from 'react';
import './AllTransactions.css';
import { Link } from 'react-router-dom';

const AllTransactions = ({ data, isData, onViewClick }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className='allTransactions'>
      <header>
        <h1>Transaction History</h1>
        <div>
          <button>
            <Link to='/transactions'>View all</Link>
          </button>
          <Link to='/customer-support'>
            <small style={{ color: '#fff', fontSize: '12px' }}>Need help?</small>
          </Link>
        </div>
      </header>
      <main>
        <ul className='allTransactions-head'>
          <li>DATE</li>
          <li>NAME/BUSINESS</li>
          <li>TYPE</li>
          <li>AMOUNT</li>
          <li>STATUS</li>
          <li style={{visibility: "hidden", backgroundColor: "green", textAlign:"right" , width: " 90px"}}>ACTION</li>
        </ul>
        {isData ? (
          data.map((item) => (
            <ul className='allTransactionBody' key={item.created_at}>
              <li>{formatDate(item.created_at)}</li>
              <li>{item.merchant}</li>
              <li>{item.type}</li>
              <li className={item.type === "debit" ? "debit-type" : "credit-type"}>{Number(item.amount).toFixed(2)}</li>
              <li style={{ color: item.status === 0 ? '#F79E1B' : item.status === 1 ? '#329521' : 'red' }}>
                {item.status === 0 ? 'Pending' : item.status === 1 ? 'Successful' : 'Failed'}
              </li>
              <li onClick={() => onViewClick(item)}>View</li>
            </ul>
          ))
        ) : (
          <h3>No Transactions</h3>
        )}
      </main>
    </div>
  );
};

export default AllTransactions;