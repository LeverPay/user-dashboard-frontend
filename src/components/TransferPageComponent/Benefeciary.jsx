import { useState } from "react";

// import { GrRefresh } from "react-icons/gr";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";

import "./Benefeciary.css";

const Benefeciary = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Determine whether it's a sent or received transaction
  const isSentTransaction = item.type === "credit";

  // Set the beneficiary name and info based on the transaction type
  const beneficiaryName = isSentTransaction
    ? item.transaction_details.sender.first_name +
      " " +
      item.transaction_details.sender.last_name
    : item.transaction_details.recipient.first_name +
      " " +
      item.transaction_details.recipient.last_name;
  const beneficiaryInfo = isSentTransaction
    ? `You received ${item.amount}`
    : `You sent ${item.amount}`;

  return (
    <div>
      <div className="benefeciary-container">
        <div>
          <p className="benefeciary-name">{beneficiaryName}</p>
          <p className="benefeciary-info">{beneficiaryInfo}</p>
        </div>
        <button className="benefeciary-btn" onClick={toggleAccordion}>
          {/* <GrRefresh className="beneficiary-refresh" /> */}
          {isOpen ? (
            <IoIosArrowDropright className="beneficiary-refresh" />
          ) : (
            <IoIosArrowDropdown className="beneficiary-refresh" />
          )}
        </button>
      </div>

      <div className={`benefeciary-content ${isOpen ? "open" : ""}`}>
        {/* Content to be shown when accordion is open */}
        <p>Additional content goes here...</p>
      </div>
    </div>
  );
};

export default Benefeciary;
