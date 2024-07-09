import React from "react";
import "./allInvoice.css";
import { useState, useEffect } from "react";
import axios from "axios";

import loadingGif from "../../assets/loading-gif.gif";
import { useLocalState } from "../../utils/useLocalStorage";
import UnpaidReceipt from "../../components/UnpaidInvoice/UnpaidReceipt";
import ReactPaginate from "react-paginate";

const Allinvoices = (props) => {
  const [allInvoices, setAllInvoices] = useState([]);
  const [isInvoice, setIsInvoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [idData, setIdData] = useState(null);
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePopUp = (id) => {
    setIdData(id);
    setPopUp(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://leverpay-api.azurewebsites.net/api/v1/user/get-invoices", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setAllInvoices(res.data.data);

        if (res.data.data.length > 0) {
          setIsInvoice(true);
        } else setIsInvoice(false);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsInvoice(false);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Pagination

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = allInvoices.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(allInvoices.length / itemsPerPage);

  const truncateName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + "..." : name;
  };

  return (
    <div className="allInvoices">
      <div className="Unpaid_con">
        <div className="Unpaid">
          <h1>All Invoices</h1>
          <table className="table">
            <thead>
              <tr>
                <td>Date</td>
                <td>Name</td>
                <td>Amount</td>
                <td>Status</td>
                <td>Invoice</td>
              </tr>
            </thead>
          </table>
          <table className="Unpaiddata">
            <tbody>
              {!isInvoice && loading && (
                <div className="receipt-loading-cont">
                  <img src={loadingGif} alt="loading gif" />
                </div>
              )}

              {isInvoice &&
                allInvoices.map((item) => {
                  return (
                    <tr key={item.uuid} className="table-data">
                      <td>{formatDate(item.created_at)}</td>
                      <td>{truncateName(item.product_name)}</td>
                      <td>&#8358; {parseInt(parseFloat(item.price))}</td>
                      <td
                        style={{
                          color:
                            item.status === 0
                              ? "#F79E1B"
                              : item.status === 1
                              ? "#329521"
                              : "red",
                        }}
                      >
                        {item.status ? "Paid" : "Unpaid"}
                      </td>
                      <td>
                        <button
                          className="view-unpaid-receipt"
                          onClick={() => handlePopUp(item.uuid)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {!isInvoice && !loading && (
                <tr style={{ textAlign: "center" }}>
                  <td>You do not have any Invoice.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div id="table_custom_pagination_container">
          <div className="pagination-controls">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>

        {popUp && (
          <div className="unpaid-receipt-popup">
            <UnpaidReceipt id={idData} setPopUp={setPopUp} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Allinvoices;
