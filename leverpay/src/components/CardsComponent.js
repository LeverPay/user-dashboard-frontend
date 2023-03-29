import React, { useState } from "react";
import "../Styles/Cards.css";
import { FcSimCardChip } from "react-icons/fc";
import logo9ja from "../assets/images/logo9ja.png";
import logoSilver from "../assets/images/logoSilver.png";
import reveal9ja from "../assets/images/reveal9ja.png";
import revealSilver from "../assets/images/revealSilver.png";
import { Link } from "react-router-dom";

const CardsComponent = ({ naijaCardData, silverCardData }) => {
  // -------------- logic for green card --------------------------//
  const naijaCardNo = naijaCardData.cardNo;

  const completeDigits = naijaCardNo ? naijaCardNo.toString() : "";
  const nCardNumber = `${completeDigits.substring(
    0,
    4
  )} ${completeDigits.substring(4, 8)} ${completeDigits.substring(
    8,
    12
  )} ${completeDigits.substring(12, 16)}`;

  const lastFourDigits = completeDigits.substr(-4);

  // ---------------------- Green card logic ends here! ---------------------- //

  // -------------- logic for silver card --------------------------//
  const silverCardNo = silverCardData.cardNo;

  const completeDigits_Silver = silverCardNo ? silverCardNo.toString() : "";
  const silverCardNumber = `${completeDigits_Silver.substring(
    0,
    4
  )} ${completeDigits_Silver.substring(4, 8)} ${completeDigits_Silver.substring(
    8,
    12
  )} ${completeDigits_Silver.substring(12, 16)}`;

  const lastFourDigits_Silver = completeDigits_Silver.substr(-4);

  // ---------------------- Silver card login ends here! ---------------------- //

  const [naijaCardReveal, setNaijaCardReveal] = useState(false);
  const [silverCardReveal, setSilverCardReveal] = useState(false);

  const handleNaijaCard = () => {
    setNaijaCardReveal((naijaCardReveal) => {
      return naijaCardReveal ? false : true;
    });
  };

  const handleSilverCard = () => {
    setSilverCardReveal((silverCardReveal) => {
      return silverCardReveal ? false : true;
    });
  };

  return (
    <>
      <nav>
        <Link to="/my cards">
          <p className="my-cards-label">My Cards</p>
        </Link>
      </nav>
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
              <img
                src={reveal9ja}
                alt=""
                className="reveal9ja-icon"
                onClick={handleNaijaCard}
              />
              <h4 className="cardNo">
                {naijaCardReveal
                  ? nCardNumber
                  : `XXXX XXXX XXXX ${lastFourDigits}`}
              </h4>
              <p className="validThru">Valid Thru</p>
              <p className="expiry-date">{naijaCardData.expiryDate}</p>
              <p className="card-holder">{naijaCardData.cardHolder}</p>
            </div>
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
              <p className="show-details-text-2" onClick={handleSilverCard}>
                Show Card Details
              </p>
              <img src={revealSilver} alt="" className="revealSilver-icon" />
              <h4 className="cardNo-2">
                {silverCardReveal
                  ? silverCardNumber
                  : `XXXX XXXX XXXX ${lastFourDigits_Silver}`}
              </h4>
              <p className="validThru-2">Valid Thru</p>
              <p className="expiry-date-2">{silverCardData.expiryDate}</p>
              <p className="card-holder-2">{silverCardData.cardHolder}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsComponent;
