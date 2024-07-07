import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalState } from "../../utils/useLocalStorage";
import "./UnpaidInvoicePage.css";
import UnpaidReceipt from "../../components/UnpaidInvoice/UnpaidReceipt";
import loadingGif from "../../assets/loading-gif.gif";
import ReactPaginate from "react-paginate";

function UnpaidInvoicePage() {
  const [data, setData] = useState([]);
  const [isdata, setIsdata] = useState(false);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [popUp, setPopUp] = useState(false);
  const [idData, setIdData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://leverpay-api.azurewebsites.net/api/v1/user/get-invoices?status=0",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        const unpaidInvoices = res.data.data.filter(
          (invoice) => invoice.status === 0
        );
        setData(unpaidInvoices);
        setLoading(false);
        if (res.data.data.length > 0) {
          setIsdata(true);
        } else setIsdata(false);
      })
      .catch((err) => {
        console.log(err);
        setIsdata(false);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handlePopUp = (id) => {
    setIdData(id);
    setPopUp(true);
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
  const currentItems = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const truncateName = (name) => {
    return name.length > 15 ? name.substring(0, 15) + "..." : name;
  };

  return (
    <div className="Unpaid_con">
      <div className="Unpaid">
        <h1>Unpaid Invoices</h1>
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
            {!isdata && loading && (
              <div className="receipt-loading-cont">
                <img src={loadingGif} alt="loading gif" />
              </div>
            )}
            {isdata &&
              currentItems.map((item) => {
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
            {!isdata && !loading && (
              <tr style={{ textAlign: "center" }}>
                <td>You do not have any Pending Invoice.</td>
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
  );
}

export default UnpaidInvoicePage;
