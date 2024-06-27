import React, { useState, useEffect } from 'react';
import './AllTransactions.css';
import AllTransactions from './AllTransactions';
import TransactionTabs from './TransactionTabs';
import { useLocalState } from '../../utils/useLocalStorage';
import axios from 'axios';
import TransactionReceipt from './TransactionReceipt';
import ReactPaginate from 'react-paginate';

const AllTransactionCon = () => {
  const [jwt, setJwt] = useLocalState('', 'jwt');
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const filteredTransactions = data.filter(transaction => {
    if (activeTab === 'all') return true;
    if (activeTab === 'successful') return transaction.status === 1;
    if (activeTab === 'pending') return transaction.status === 0;
    if (activeTab === 'failed') return transaction.status === 2;
    return true;
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredTransactions.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className='allTransactionCon'>
      <TransactionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pagination-controls">
        <label htmlFor="itemsPerPage">Items per page:</label>
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <AllTransactions data={currentItems} isData={currentItems.length > 0} onViewClick={handleViewClick} />
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      {isModalOpen && <TransactionReceipt isOpen={isModalOpen} onClose={handleCloseModal} transaction={selectedTransaction} />}
    </div>
  );
};

export default AllTransactionCon;
