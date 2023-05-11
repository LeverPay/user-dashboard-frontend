import React, { useState } from "react";
// import CardInfo from "../CardInfo";
import CardInfo from "../../TestData/CardInfo";

function CardSilver() {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const cardNumber = CardInfo[4].no;
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

  function seeCVV(){
    setCardCVV(prevCVV =>{
      return prevCVV ? false : true 
    })
  }

  function copyCardNumber(){
    setCardCopied((prevCopy)=>{
      return prevCopy ? false : true 
    })
    navigator.clipboard.writeText(cardNumber);
  }

  

  return (
    <div
      className="defaultCard"
      style={{
        backgroundImage: `url('./images/CardSilver.png')`,
        color: "#253B80",
        position: 'relative'
      }}
    >
        <span  style={{
        position: 'absolute',
        top: '60%', left: '75%',
        cursor: 'pointer'
      }}>
      <img alt="" src="./images/copy.png" onClick={copyCardNumber}/>
      <small>{cardCopied ? ' copied' : ''}</small>
      </span>   

      <span  style={{
        position: 'absolute',
        top: '70%', left: '35%',
        cursor: 'pointer'
      }}
      >
        <small>C V V : <strong onMouseEnter={seeCVV} onMouseLeave={()=>{setCardCVV(false)}}>{cardCVV ? CardInfo[4].cvv : '***'}</strong></small> 
      </span>


      <img alt="" src="./images/silver logo.png" className="LeverpayCardLogo" />
      <main className="card_one">
        <img alt="" src="./images/chip 1.png" />
        <span>
          <img
            alt=""
            src="./images/🦆 icon _eye_silver.png"
            onClick={seeCard}
          />
          <br />
          <small>Show Card Details</small>
        </span>
      </main>
      <p className="cardnumber">
        {cardVisible ? CardNumberFirstTwelve : "XXXX XXXX XXXX"}{" "}
        {CardNumberLastFour}
      </p>
      <main className="cardDate_Type">
        <span className="cardDate">
          <small>Valid Thru </small>
          <br />
          <small>
            {month < 10 ? `0${month}` : month}/ {year + 2}{" "}
          </small>
        </span>
        <strong>USDT</strong>
      </main>
      <footer
        style={{
          backgroundImage: `url('./images/Ellipse 6.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0rem top 0rem",
        }}
      >
        <h2>{CardInfo[4].name}</h2>
        <h1
          style={{
            marginRight: "-1rem",
            backgroundImage: "./images/Ellipse 6.png",
          }}
        >
          {" "}
          Silver
        </h1>
      </footer>
      
    </div>
  );
}

export default CardSilver;