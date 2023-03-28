import React from "react";
import "../Styles/Cards.css";
import { FcSimCardChip } from "react-icons/fc";
import logo9ja from "../assets/logo9ja.png";
import logoSilver from "../assets/logoSilver.png";
import reveal9ja from "../assets/reveal9ja.png";
import revealSilver from "../assets/revealSilver.png";

const CardsComponent = () => {
  return (
    <>
      <p className="my-cards-label">My Cards</p>
      <div className="card-container">
        <div className="dashboard-card">
          <div className="card-inner">
            <div className="card-front">
              <FcSimCardChip
                size={50}
                style={{
                  position: "absolute",
                  left: "6.78%",
                  right: "77.4",
                  top: "20%",
                  bottom: "58.9%",
                }}
              />
              <img src={logo9ja} alt="" className="logo9ja" />
              <p className="show-details-text">Show Card Details</p>
              <img src={reveal9ja} alt="" className="reveal9ja-icon" />
              <h4 className="cardNo"> XXXX XXXX XXXX 1213</h4>
              <p className="validThru">Valid Thru</p>
              <p className="expiry-date">04/24</p>
              <p className="card-holder">Goodness Michael</p>
            </div>
            {/* <div className="card-back">
              <img src={logo9ja} alt="" className="logo9ja" />
              <h4 className="cardNo"> 1234 5678 9011 1213 </h4>
              <p className="validThru">Valid Thru</p>
              <p className="expiry-date">04/24</p>
            </div> */}
          </div>
        </div>
      </div>
      {/* card two */}
      <div className="card-container-2">
        <div className="dashboard-card-2">
          <div className="card-inner-2">
            <div className="card-front-2">
              <FcSimCardChip
                size={50}
                style={{
                  position: "absolute",
                  left: "6.78%",
                  right: "77.4",
                  top: "20%",
                  bottom: "58.9%",
                }}
              />
              <img src={logoSilver} alt="" className="logoSilver" />
              <p className="show-details-text-2">Show Card Details</p>
              <img src={revealSilver} alt="" className="revealSilver-icon" />
              <h4 className="cardNo-2"> XXXX XXXX XXXX 1213</h4>
              <p className="validThru-2">Valid Thru</p>
              <p className="expiry-date-2">04/24</p>
              <p className="card-holder-2">Goodness Michael</p>
            </div>
            {/* <div className="card-back-2">
              <img src={logoSilver} alt="" className="logoSilver" />
              <h4 className="cardNo-2"> 1234 5678 9011 1213 </h4>
              <p className="validThru-2">Valid Thru</p>
              <p className="expiry-date-2">04/24</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsComponent;
