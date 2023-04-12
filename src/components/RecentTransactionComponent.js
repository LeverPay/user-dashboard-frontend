import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import "../Styles/Recent-Transaction.css";

const RecentTransactionComponent = () => {
  return (
    <div className="rt-div">
      <h4 className="rt-label">Recent Transactions</h4>
      <BsSearch size={14} className="rt-searchIcon" />
      <p className="rt-view-all-link">
        View All <AiOutlineRight />
      </p>
      <table className="recentTransactionTable">
        <thead>
          <tr>
            <th>NAME/BUSINESS</th>
            <th>TYPE</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Iphone 13 ProMax</td>
            <td>Mobile</td>
            <td>$420.84</td>
            <td>Completed</td>
            <td>23 Mar 2023</td>
          </tr>
          <tr>
            <td>Netflix</td>
            <td>Entertainment</td>
            <td>$420.64</td>
            <td>Pending</td>
            <td>24 Mar 2023</td>
          </tr>
          <tr>
            <td>Nike Emax</td>
            <td>Shoes</td>
            <td>$420.64</td>
            <td>Completed</td>
            <td>25 Mar 2023</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactionComponent;
