import React from 'react'
// import Col from "react-bootstrap/esm/Col";
import './totalMoney.css'

function TotalMoney(props) {
  const { bg, totaltype, amt } = props

  return (
    <div className="card-balance" style={{ backgroundColor: bg }}>
      <span>
        <img alt="" src="./images/bal1.png" />
      </span>
      <main>
        <small>Total {totaltype} </small>
        <h4> {amt} </h4>
      </main>
    </div>
  )
}

export default TotalMoney