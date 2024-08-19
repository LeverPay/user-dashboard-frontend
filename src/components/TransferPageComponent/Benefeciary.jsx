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

  // Safely access sender and recipient information
  const sender = item.transaction_details?.sender;
  const recipient = item.transaction_details?.recipient;

  const beneficiaryName = isSentTransaction
    ? sender
      ? `${sender.first_name} ${sender.last_name}`
      : "Unknown Sender"
    : recipient
    ? `${recipient.first_name} ${recipient.last_name}`
    : "Unknown Recipient";

  const beneficiaryInfo = isSentTransaction
    ? `You received ${item.amount}`
    : `You sent ${item.amount}`;

  // Convert ISO date string to formatted date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = date.getUTCHours() >= 12 ? 'pm' : 'am';

    return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
  };

  const formattedDate = formatDate(item.created_at);

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
            <IoIosArrowDropdown className="beneficiary-refresh" />
          ) : (
            <IoIosArrowDropright className="beneficiary-refresh" />
          )}
        </button>
      </div>

      <div className={`benefeciary-content ${isOpen ? "open" : ""}`}>
        {/* Content to be shown when accordion is open */}
        <p className="benefeciary-info">Currency: {item.currency}</p>
        <p className="benefeciary-info">Date: {formattedDate}</p>
        <p className="benefeciary-info">Reference No:  {item.tnx_reference_no}</p>
      </div>
    </div>
  );
};

export default Benefeciary;
