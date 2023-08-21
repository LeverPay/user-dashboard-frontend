import React, { useState } from "react";
// import Col from "react-bootstrap/esm/Col";
import "./totalMoney.css";

function TotalMoney(props) {
  console.log(props);
  const { bg, transfer, totaltype, amt } = props;
  const [amtVisible, setAmtVisible] = useState(false);

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
        <h4> {amtVisible ? amt : "XXXX"} </h4>
      </main>
    </div>
  );
}

export default TotalMoney;
