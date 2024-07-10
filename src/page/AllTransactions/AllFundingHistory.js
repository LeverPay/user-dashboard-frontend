import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocalState } from '../../utils/useLocalStorage';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './AllTransactions.css';

const AllFundingHistory = () => {
  const [jwt] = useLocalState('', 'jwt');
  const [data, setData] = useState([]);
  const [isData, setIsData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const baseurl = 'https://leverpay-api.azurewebsites.net/api/v1/user/get-all-topup-requests';

  useEffect(() => {
    axios.get(baseurl, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((res) => {
        setData(res.data.data);
        setIsData(res.data.data.length > 0);
      })
      .catch((error) => {
        console.error("ERROR:", error);
        setIsData(false);
      });
  }, [jwt]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);

  return (
    <>
    <div className='pagination-controls'>
          <label htmlFor="itemsPerPage">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
    </div>
    <div className='allTransactions'>
      <header>
        <h1>Funding History</h1>
        <div>
          <Link to="/customer-support">
            <small style={{ color: "#fff", fontSize: "12px" }}>Need help?</small>
          </Link>
        </div>
      </header>
      <main>
        <ul className='allTransactions-head' id='fundingHistory-head'>
          <li>DATE</li>
          <li>AMOUNT</li>
          <li>STATUS</li>
          <li>REFERENCE</li>
        </ul>
        {isData ? (
          currentItems.map(item => (
            <ul className='allTransactionBody' id='fundingHistory-body' key={item.reference}>
              <li>{formatDate(item.created_at)}</li>
              <li>{Number(item.amount).toFixed(2)}</li>
              <li>
                {item.status === 0 ? (
                  <span style={{ color: '#F79E1B' }}>Pending</span>
                ) : item.status === 1 ? (
                  <span style={{ color: '#329521' }}>Completed</span>
                ) : (
                  <span style={{ color: '#FF0606' }}>Cancelled</span>
                )}
              </li>
              <li>{item.reference}</li>
            </ul>
          ))
        ) : (
          <h3>No Transactions</h3>
        )}
      </main>
      <footer>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(data.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </footer>
    </div>
    </>

  );
};

export default AllFundingHistory;
