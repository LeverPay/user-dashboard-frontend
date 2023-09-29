import React, { useState } from "react";
// import Col from "react-bootstrap/esm/Col";
import "./totalMoney.css";

function TotalMoney(props) {
  console.log(props);
  const { bg, transfer, totaltype, amt, exAmt, naira_code, dollar_code } =
    props;
  const [amtVisible, setAmtVisible] = useState(false);

  // console.log(amt);

  function viewamt() {
    setAmtVisible(!amtVisible);
  }

  return (
    <div
      className="card-balance col-md-12"
      style={{ backgroundColor: bg }}
      onClick={viewamt}
    >
      <span>
        <img alt="" src="./images/bal1.png" />
      </span>
      <main>
        <small>{totaltype}</small>
        {transfer}
        <h4 className="total-h4"> {amtVisible ? naira_code + amt : "XXXX"} </h4>
        <h4 className="total-h4 ext-v">
          {amtVisible ? dollar_code + exAmt : "XXXX"}
        </h4>
      </main>
    </div>
  );
}

export default TotalMoney;
