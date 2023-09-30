import React, { useState } from "react";
import "./card.css";
import "bootstrap/dist/css/bootstrap.min.css";

function CardDefault(props) {
  const userJson = localStorage.getItem('user')
  const userData = JSON.parse(userJson)
  console.log(userData)

  const cardNumber = userData ? userData.card.card_number : '';
  const cardNumber_string = cardNumber.toString();
  const CardNumberFirstTwelve = `${cardNumber_string.slice(
    0,
    4
  )}  ${cardNumber_string.slice(4, 8)}  ${cardNumber_string.slice(8, 12)}`;
  const CardNumberLastFour = `${cardNumber_string.slice(12, 16)}`;

  const [cardVisible, setCardVisible] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);
  const [cardCVV, setCardCVV] = useState(false);

  function seeCard() {
    setCardVisible((prevCard) => {
      return prevCard ? false : true;
    });
  }

  function seeCVV() {
    setCardCVV((prevCVV) => {
      return prevCVV ? false : true;
    });
  }

  function copyCardNumber() {
    setCardCopied((prevCopy) => {
      return prevCopy ? false : true;
    });
    navigator.clipboard.writeText(cardNumber);
  }

  return (
    <div
      className="defaultCard"
      style={{
        backgroundImage: `url(${props.backgroundImage})`,
        color: "white",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "60%",
          left: "75%",
          cursor: "pointer",
        }}
      >
        <img alt="" src='./images/copy.png' onClick={copyCardNumber} />
        <small>{cardCopied ? " copied" : ""}</small>
      </span>

      <span
        style={{
          position: "absolute",
          top: "70%",
          left: "25%",
          cursor: "pointer",
          color: "white",
        }}
        className="cvv"
      >
        <small>
          C V V :{" "}
          <strong
            onMouseEnter={seeCVV}
            onMouseLeave={() => {
              setCardCVV(false);
            }}
          >
            {cardCVV ? userData ? userData.card.cvv: 123 : "xxx"}
          </strong>
        </small>
      </span>

      <img alt="" src="./images/cardHeader.png" className="LeverpayCardLogo" />
      <main className="card_one">
        <img
          alt=""
          src="./images/card scan.png"
          className="card_scan"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        />
        <span>
          <img
            alt=""
            src="./images/card visible.png"
            onMouseOver={seeCard}
            onMouseLeave={() => {
              setCardVisible(false);
            }}
          />
          <br />
          <small style={{ color: "white" }}>Show Card Details</small>
        </span>
      </main>
      <b className="cardnumber">
        {cardVisible ? CardNumberFirstTwelve : "XXXX XXXX XXXX"}{" "}
        {CardNumberLastFour}
      </b>
      <main className="cardDate_Type">
        <span className="cardDate" style={{ color: "white" }}>
          <small className="expiry">Valid Thru </small>
          <br />
          <small>
            {userData ? userData.card.expiry.slice(0, 10) : ''}
          </small>
        </span>
        <strong>{props.cardtype}</strong>
      </main>
      <footer
        style={{
          backgroundImage: props.bg2,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0rem top 0rem",
        }}
      >
        <h2>{userData ? userData.first_name + " " + userData.last_name: ''}</h2>
        <h1
          className="cardcateory"
          id="card-cardname"
          style={{
            marginRight: "-1rem",
            fontFamily: "Consolas",
            fontWeight: "700",
            lineHeight: "35px",
            letterSpacing: " 0.02em",
          }}
        >
          <img
            alt=""
            src={props.lock}
            style={{ marginRight: "-.5rem", marginTop: "-.2em" }}
          />{" "}
          {props.cardname}
        </h1>
      </footer>
    </div>
    // </Container>
  );
}

export default CardDefault;
