import React from "react";
import "./transaction-messages.css";
function BalanceReport() {
  return (
    <div className="insufficient-balance">
      <p className="alert1">
        You Have Insufficient funds in your GOLD Account to complete this
        transaction.
      </p>

      <p className="alert2">
        You need additional<span> $20.00 USD</span> to Complete this
        transaction. Thank you.
      </p>
    </div>
  );
}

export default BalanceReport;
