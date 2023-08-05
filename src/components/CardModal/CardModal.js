import React from "react";
import "./CardModal.css";
// import MyCardDiamond from '../../page/DiamondCardPage/MyCardDiamond'

function CardModal(props) {
  return (
    <div className="overlay">
      <div>
        <div className="card-modal">
          <ul>
            <li>Card Type: Gold</li>
            <li>Card Owner: Shedrach Damian</li>
            <li>Card Number: 1234567898703467</li>
            <li>CVV: 123</li>
            <li>Expiry date: 03/2025</li>
          </ul>
          <button>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
