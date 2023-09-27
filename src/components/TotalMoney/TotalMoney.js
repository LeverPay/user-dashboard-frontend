import React, { useState } from "react";
// import Col from "react-bootstrap/esm/Col";
import "./totalMoney.css";

function TotalMoney(props) {
  console.log(props);
  const { bg, transfer, totaltype, amt } = props;
  const [amtVisible, setAmtVisible] = useState(false);

  const dollar ='$' + Number(amt/900).toFixed(2)

  function viewamt() {
    setAmtVisible(!amtVisible);
  }

  return (
    <div
      className="card-balance col-md-12"
      style={{ backgroundColor: bg }}
      onClick={viewamt}
    >
      <span className="bal-img-con">
        <img alt="" src="./images/bal1.png" />
      </span>
      <main>
        <p>{totaltype}</p>
        <strong> {amtVisible ? `N${amt}` : "XXXX"} </strong>
        <small>{amtVisible ? dollar : 'xxx'}</small> 
      </main>
    </div>
  );
}

export default TotalMoney;
