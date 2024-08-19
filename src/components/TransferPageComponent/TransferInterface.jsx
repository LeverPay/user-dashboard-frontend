import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLocalState } from "../../utils/useLocalStorage";
import { fetchTransactions } from "../../services/transferService";

import Benefeciary from "./Benefeciary";

import "./TransferInterface.css";
import { IoIosArrowBack } from "react-icons/io";

import logoBlue from "../../assets/images/logo-blue.svg";
import bluePlane from "../../assets/images/blue-plane.svg";

const TransferInterface = () => {
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  const [jwt] = useLocalState("", "jwt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure we await the response
        const response = await fetchTransactions(jwt);

        // Filter transactions with merchant value of "transfer"
        const filteredTransactions = response.data.filter(
          (transaction) => transaction.merchant === "transfer"
        );

        // Update the transactions state with the filtered list
        setTransactions(filteredTransactions);

        // setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [jwt]);

  return (
    <section id="transfer-interface">
      <div className="transfer-header">
        <button onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </button>
        <h1>Transfer</h1>
        <div className="not-needed"></div>
      </div>

      <div className="transfer-body">
        <div className="transfer-options">
          <div className="transfer-option">
            <img src={logoBlue} alt="blue logo" />
            <div>
              <Link to="/transfer-info" className="option-link">
                Send to @Email
              </Link>
              <p className="option-text">
                Send to any leverpay account for free
              </p>
            </div>
          </div>
          <div className="transfer-option">
            <img src={bluePlane} alt="blue plane" />
            <div>
              <Link to="#" className="option-link">
                Send to Bank
              </Link>
              <div className="option-extra">
                <p className="option-text">Send to any Local Bank</p>
                <div className="option-label">Coming soon</div>
              </div>
            </div>
          </div>
        </div>

        <div className="beneficiaries-wrapper">
          <div className="benefeciaries-wrapper-head">
            <h2>Beneficiaries</h2>

            {/* <div>
              <button className="all-beneficiary-btn" onClick={toggleShowAll}>
                {showAll ? "Show less" : "View all"}
              </button>
            </div> */}
          </div>

          <div
            className="benefeciaries-wrapper-body">
            {transactions.length > 0 &&
              transactions.map((item, index) => (
                <Benefeciary key={index} item={item} />
              ))}

            {transactions.length < 1 && <p>No Transactions yet!</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferInterface;
