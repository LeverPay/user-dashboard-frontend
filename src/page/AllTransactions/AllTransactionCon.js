import React, { useState, useEffect } from 'react';
import './AllTransactions.css';
import AllTransactions from './AllTransactions';
import TransactionTabs from './TransactionTabs';
import { useLocalState } from '../../utils/useLocalStorage';
import axios from 'axios';
import TransactionReceipt from './TransactionReceipt';

const AllTransactionCon = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const baseurl = 'https://leverpay-api.azurewebsites.net/api/v1/user/get-user-transactions';

  useEffect(() => {
    axios.get(baseurl, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
      setIsData(res.data.data.length > 0);
    })
    .catch(error => {
      console.log(error);
      setIsData(false);
    });
  }, [jwt]);

  const handleViewClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = data.filter(transaction => {
    if (activeTab === 'all') return true;
    if (activeTab === 'successful') return transaction.status === 1;
    if (activeTab === 'pending') return transaction.status === 0;
    if (activeTab === 'failed') return transaction.status === 2;
    return true;
  });



  return (
    <div className='allTransactionCon'>
      <TransactionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <AllTransactions data={filteredTransactions} isData={isData} onViewClick={handleViewClick}/>
      <TransactionReceipt isOpen={isModalOpen} onClose={handleCloseModal} transaction={selectedTransaction}/>
    </div>
  );
};

export default AllTransactionCon;